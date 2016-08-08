if (!require('kernlab')) {
  install.packages('kernlab')
}
library("kernlab")


svm<- function(data_train, target) {

  classifier = ksvm(target ~ ., data = data_train, kernel = "rbfdot")
  return (classifier)

}
#table(predict, data_test$health)

