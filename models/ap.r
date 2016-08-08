
if (!require('apcluster')) {
  install.packages('apcluster')
}
library("apcluster")

data_path = paste(getwd(), "/data/", sep="")

sensor_data =  read.csv(file=paste(data_path, "data_buffer.txt", sep=""), sep = ",")

colnames(sensor_data) = c("systolic1", "diastolic1", "systolic2", "diastolic2", 
                   "heartrate1", "heartrate2")

Aff_canberra <- function(gene_data, k) {
  s1 = negDistMat(gene_data,method="canberra");
  capture.output(apres <- apclusterK(s1,K=k), file = "NUL");
  
  canberra = numeric(apres@l);
  
  for(i in 1:k)
  {
    for(j in 1:length(apres@clusters[[i]])) 
    {
      canberra[apres@clusters[[i]][[j]]] =  i;
    }
  }
  return(canberra)  
}

re = Aff_canberra(sensor_data, 2);

cat(re)
