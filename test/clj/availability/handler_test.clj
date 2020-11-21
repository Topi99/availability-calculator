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
                                 :calendar [["10:30" "11:25"]]
                                 :day-ends "18:00"})))]
        (is (= 200 (:status response)))))))
