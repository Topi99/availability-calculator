(ns availability.handler-test
  (:require
    [clojure.test :refer :all]
    [ring.mock.request :refer :all]
    [availability.handler :refer :all]
    [availability.middleware.formats :as formats]
    [muuntaja.core :as m]
    [mount.core :as mount]))

(defn parse-json [body]
  (m/decode formats/instance "application/json" body))

(use-fixtures
  :once
  (fn [f]
    (mount/start #'availability.config/env
                 #'availability.handler/app-routes)
    (f)))

(deftest test-app
  (testing "not-found route"
    (let [response ((app) (request :get "/invalid"))]
      (is (= 404 (:status response)))))

  (testing "services"
    (testing "success availability"
      (let [response ((app) (-> (request :post "/api/availability")
                                (json-body {
                                 :day-starts "08:00",
                                 :calendar [["10:30", "11:25"]]
                                 :day-ends "18:00"
                                })))]
        (is (= 200 (:status response)))
        (is (= {:available [["08:00", "10:30"], ["11:25", "18:00"]]}
               (m/decode-response-body response)))))

    (testing "only two available slots when two events overlap"
      (let [response ((app) (-> (request :post "/api/availability")
                                (json-body {
                                 :day-starts "08:00",
                                 :calendar [["10:30", "11:25"], ["11:10", "12:30"]],
                                 :day-ends "18:00"
                                })))]
        (is (= 200 (:status response)))
        (is (= {:available [["08:00", "10:30"], ["12:30", "18:00"]]}
               (m/decode-response-body response)))))

    (testing "last event finishes later than initial day-ends"
      (let [response ((app) (-> (request :post "/api/availability")
                                (json-body {
                                 :day-starts "08:00",
                                 :calendar [["10:30", "11:25"], ["17:30", "19:25"]],
                                 :day-ends "18:00"
                                })))]
        (is (= 200 (:status response)))
        (is (= {:available [["08:00", "10:30"], ["11:25", "17:30"]]}
               (m/decode-response-body response)))))

    (testing "last event finishes later than initial day-ends and overlaps"
      (let [response ((app) (-> (request :post "/api/availability")
                                (json-body {
                                :day-starts "08:00",
                                :calendar [["10:30", "11:25"], ["17:30", "19:25"]],
                                :day-ends "18:00"
                                })))]
        (is (= 200 (:status response)))
        (is (= {:available [["08:00", "10:30"], ["11:25", "17:30"]]}
              (m/decode-response-body response)))))

    (testing "last event finishes later than initial day-ends and overlaps"
      (let [response ((app) (-> (request :post "/api/availability")
                                (json-body {
                                :day-starts "08:00",
                                :calendar [["100:30", "11:25"], ["17:30", "19:25"]],
                                :day-ends "18:00"
                                })
                                (content-type "application/json")))]
        (is (= 400 (:status response)))))))
