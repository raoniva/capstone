if (!require('rjson')) {
  install.packages('rjson')
}
library("rjson")
#call learning method return json

data_path = paste(getwd(), "/data/", sep="")

args = commandArgs(TRUE)
if (length(args) == 0)
{
  time = format(Sys.time(), "%Y-%m-%dT%H")
  #time = "2016-04-29T04"
} else {
  time = args[1]
}
####################################
#load data
sensor_data =  read.csv(file=paste(data_path, "data_", time, ".txt", sep=""), sep = ",",row.names = 1)
colnames(sensor_data) = c("systolic1", "diastolic1", "systolic2", "diastolic2", 
                   "heartrate1", "heartrate2", "health")
sensor_data$time = row.names(sensor_data)
#na_idx = which(is.na(sensor_data$health))
#data_label = sensor_data[setdiff(1:nrow(sensor_data), na_idx),]
##data_predict = sensor_data[na_idx,]
#data_label$health = factor(data_label$health)
#data_train = data_label[1:floor(0.75*nrow(data_label)),]
#data_test = data_label[floor(0.75*nrow(data_label))+1:ceiling(0.25*nrow(data_label)),]
#data_train$health = factor(data_train$health)

#data_train = setnsor_data[1:floor(0.75*nrow(sensor_data)),]
#data_test = sensor_data[floor(0.75*nrow(sensor_data))+1:ceiling(0.25*nrow(sensor_data)),]

####################################
#form json data
json <- toJSON(sensor_data)

cat(json)
