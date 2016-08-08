work_dir = "D:/tools/xampp/htdocs/wit/wearable_analysis/myapp/public/"
HealthHeader = c("systolic1", "diastolic1", "systolic2",
        "diastolic2",  "heartrate1", "heartrate2", "health")
fake = matrix(0, nrow = 1000, ncol = length(HealthHeader))
colnames(fake) = HealthHeader
                  
# fake blood pressure 90/60-120/80 mm Hg systolic/diastolic
i = 0
fake[,i+1] = sample(c(90:120), 1000, replace=TRUE);
fake[,i+2] = sample(c(60:80), 1000, replace=TRUE);

fake[,i+3] = sample(c(90:120), 1000, replace=TRUE);
fake[,i+4] = sample(c(60:80), 1000, replace=TRUE);

# fake heat rate 60–100 bpm (beats per min)
i = 4
fake[,i+1] = sample(c(60:100), 1000, replace=TRUE);
fake[,i+2] = sample(c(60:100), 1000, replace=TRUE);

# fake label
i = 6
fake[,i+1] = sample(c(1,2,NA), 1000, replace = TRUE);

write.csv(fake, file=paste(work_dir, "simulate.txt", sep=""), row.names = FALSE)