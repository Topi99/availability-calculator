(ns availability.controllers.availability)

;; parse-int: string -> int
(defn parse-int [s]
  "Parses string to int"
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
    (if (or (>= (parse-int hours) 24) (>= (parse-int minutes) 60))
      (throw (ex-info "Invalid hour" {:status-code 400}))
      (round 3 (+ (parse-int hours) (/ (parse-int minutes) 60)))) ;; sum minutes and hours
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

(defn to-string-hour [hour]
  "Returns a given hour in decimal values to its HH:MM equivalent"
  (let [hours (int hour) str-format "%02d"]
    (str (format str-format hours)
         (str ":" (format str-format (int (round 2 (* (- hour hours) 60))))))))

(defn helper-get-available [start end calendar result]
  "Helper function for get-available to make it tail recursive"
  (let [next-event-start (first (first calendar))
        next-event-end (first (rest (first calendar)))]
    (cond
      (>= start end)
        result
      (empty? calendar) ;; last event
        (my-append result [(to-string-hour start) (to-string-hour end)]) ;; return the result
      (<= next-event-start start) ;; in case the event overlaps the past event
        (helper-get-available
          next-event-end
          end
          (rest calendar)
          result)
      :else
        (helper-get-available
          next-event-end ;; new start hour
          end
          (rest calendar) ;; new calendar
          (my-append result
            [(to-string-hour start) (to-string-hour next-event-start)]))))) ;; new result

(defn get-available [start end calendar]
  "Returns the available hours for a given bussy calendar"
  (helper-get-available start end calendar []))

;; get-availability: {{{:calendar vector, :day-starts string, :day-ends string}}} -> map
(defn get-availability [{{{:keys [calendar day-starts day-ends]} :body} :parameters}]
  "Main function to get availability"
  (try
    {:status 200
     :body {:available
              (get-available
                (parse-int day-starts)
                (parse-int day-ends)
                (my-map (fn [event] (my-map to-decimal-hour event)) calendar))}}
    (catch clojure.lang.ExceptionInfo e
      (case
        (= 400 (-> e ex-data :status-code))
          {:status 400
          :body {:message (or (ex-message e) "Invalid request")}}))))
