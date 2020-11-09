(ns availability.controllers.availability)

;; parse-int: string -> int
(defn parse-int [s]
  (Integer. (re-find  #"\d+" s )))

(defn round
  "Round a double to the given precision (number of significant digits)"
  [precision d]
  (let [factor (Math/pow 10 precision)]
    (/ (Math/round (* d factor)) factor)))

;; my-map: callable, seq -> seq
(defn my-map [func list]
  "Simple map implementation"
  (if (empty? list)
    ()
    (cons (func (first list)) (my-map func (rest list)))))

;; my-append: list, any -> list
(defn my-append [list el]
  "Returns new list with the given element added at last of original list"
  (if (empty? list) 
    (cons el [])
    (cons (first list) (my-append (rest list) el))))

;; helper-to-decimal-hour: seq, string string boolean -> seq
(defn helper-to-decimal-hour [inp-hour hours minutes now-minutes]
  "Helper function to make tail recursion"
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
  "Returns a given hour in HH:MM string format to its decimal equivalent"
  (helper-to-decimal-hour (seq hour) "" "" false))

(defn helper-get-available [start end calendar result]
  (cond
    (and (not (empty? (first calendar))) (empty? (rest calendar))) ;; last event
      (my-append result [(first (rest (first calendar))) end]) ;; return the result
    (<= (first (first calendar)) start) ;; in case the event overlaps the past event
      (helper-get-available
        (first (rest (first calendar)))
        end
        (rest calendar)
        result)
    :else (helper-get-available
            (first (rest (first calendar))) ;; new start hour
            end
            (rest calendar) ;; new calendar
            (my-append result [start (first (first calendar))])))) ;; new result

(defn get-available [start end calendar]
  (helper-get-available start end calendar []))

;; get-availability: {{{:calendar vector, :day-starts string, :day-ends string}}} -> map
(defn get-availability [{{{:keys [calendar day-starts day-ends]} :body} :parameters}]
  "Main function to get availability"
  {:status 200
   :body {:available (get-available
                        (parse-int day-starts)
                        (parse-int day-ends)
                        (my-map (fn [event] (my-map to-decimal-hour event)) calendar))}})
