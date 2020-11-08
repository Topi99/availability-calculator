(ns availability.controllers.availability)

;; parse-int: string -> int
(defn parse-int [s]
  (Integer. (re-find  #"\d+" s )))

;; simple map implementation
;; my-map: callable, seq -> seq
(defn my-map [func list]
  (if (empty? list)
    ()
    (cons (func (first list)) (my-map func (rest list)))))

;; helper function to make tail recursion
;; helper-to-decimal-hour: seq, string string boolean -> seq
(defn helper-to-decimal-hour [inp-hour hours minutes now-minutes]
  (if (empty? inp-hour)
    (+ (parse-int hours) (/ (parse-int minutes) 60)) ;; sum minutes and hours
    (if (= (first inp-hour) \:) ;; if found ":", then look for munutes
      (helper-to-decimal-hour (rest inp-hour) hours minutes true)
      (if now-minutes
        (helper-to-decimal-hour
          (rest inp-hour) hours (str minutes (first inp-hour)) now-minutes)
        (helper-to-decimal-hour
          (rest inp-hour) (str hours (first inp-hour)) minutes now-minutes)))))

(defn to-decimal-hour [hour]
  (helper-to-decimal-hour (seq hour) "" "" false))

;; main function to get availability
;; get-availability: {{{:calendar vector, :day-starts string, :day-ends string}}} -> map
(defn get-availability [{{{:keys [calendar day-starts day-ends]} :body} :parameters}]
  {:status 200
   :body {:available (my-map (fn [event] (my-map to-decimal-hour event)) calendar)}})
