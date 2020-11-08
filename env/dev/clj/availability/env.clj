(ns availability.env
  (:require
    [selmer.parser :as parser]
    [clojure.tools.logging :as log]
    [availability.dev-middleware :refer [wrap-dev]]))

(def defaults
  {:init
   (fn []
     (parser/cache-off!)
     (log/info "\n-=[availability started successfully using the development profile]=-"))
   :stop
   (fn []
     (log/info "\n-=[availability has shut down successfully]=-"))
   :middleware wrap-dev})
