if (!require('caret')) {
  install.packages('caret')
}
library("caret")
if (!require('rjson')) {
  install.packages('rjson')
}
library("rjson")
#call learning method return json

data_path = paste(getwd(), "/data/", sep="")

args = commandArgs(TRUE)
if (length(args) == 0)
{
  write("Error: you should specify the name", stderr())
}
method_str= args[1]
if (length(args) > 1) {
  time = args[2]
} else {
  time = format(Sys.time(), "%Y-%m-%dT%H")
  #time = "2016-04-29T04"
}
####################################
#load method
source(paste(getwd(), '/models/', method_str, '.r', sep = ''))

####################################
#load data
sensor_data =  read.csv(file=paste(data_path, "data_", time, ".txt", sep=""), sep = ",",row.names = 1)
colnames(sensor_data) = c("systolic1", "diastolic1", "systolic2", "diastolic2", 
                   "heartrate1", "heartrate2", "health")

na_idx = which(is.na(sensor_data$health))
data_label = sensor_data[setdiff(1:nrow(sensor_data), na_idx),]
#data_predict = sensor_data[na_idx,]
data_label$health = factor(data_label$health)
data_train = data_label[1:floor(0.75*nrow(data_label)),]
data_test = data_label[floor(0.75*nrow(data_label))+1:ceiling(0.25*nrow(data_label)),]
#data_train$health = factor(data_train$health)

#data_train = setnsor_data[1:floor(0.75*nrow(sensor_data)),]
#data_test = sensor_data[floor(0.75*nrow(sensor_data))+1:ceiling(0.25*nrow(sensor_data)),]

####################################
#run the learning model
classifier = do.call(method_str, list(data_train, data_train$health))

####################################
#get prediction
predict = predict(classifier, data_test)

####################################
#get evaluation
precision = posPredValue(predict, data_test$health)
recall = sensitivity(predict, data_test$health)

f1 = 2 * precision * recall / (precision + recall)

####################################
#form json data
re = list(precision = precision, recall = recall, f1 = f1, predict = predict, health = data_test$health, time = row.names(data_test))

re$data = data_test

json <- toJSON(re)

cat(json)