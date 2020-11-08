(ns availability.env
  (:require [clojure.tools.logging :as log]))

(def defaults
  {:init
   (fn []
     (log/info "\n-=[availability started successfully]=-"))
   :stop
   (fn []
     (log/info "\n-=[availability has shut down successfully]=-"))
   :middleware identity})
