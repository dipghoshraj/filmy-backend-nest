import {
    Processor,
    Process,
    OnQueueActive,
    OnQueueCompleted,
  } from '@nestjs/bull';
  import { Job } from 'bull';
  import { Logger } from '@nestjs/common';



@Processor('sendotp')
export class OtpProcessor {

    @Process('process_data')
    async process(job: Job): Promise<any>{
        const message = job.data['message'];
        const URL = `https://api.msg91.com/api/sendhttp.php?country=91&route=4&mobiles=7980284649&authkey=245868ACJH5CmUGWu67239a3bP1&message=${message}`
        console.log(job.data, URL)
    }

    @OnQueueActive()
    onActive(job: Job<unknown>) {
        // Log that job is starting
        Logger.log(`Starting job ${job.id} : ${job.data['message']}`);
    }

    @OnQueueCompleted()
    onCompleted(job: Job<unknown>) {
        // Log job completion status
        Logger.log(`Job ${job.id} has been finished`);
    }
}


// Your OTP is ${otp}
// const AUTH_KEY = process.env.MSG91_AUTH_KEY
//       const msg = encodeURIComponent(message)
//       const URL = `https://api.msg91.com/api/sendhttp.php?country=91&route=4&mobiles=7980284649&authkey=245868ACJH5CmUGWu67239a3bP1&message=${x}`
//       const { data } = await axios.get(URL)



// curl --request POST \
//   --url 'https://control.msg91.com/api/v5/otp?otp_expiry=10&template_id=1&mobile=7980284649&authkey=&realTimeResponse=' \
//   --header 'Content-Type: application/JSON' \
//   --data '{
//   "Param1": "value1",
//   "Param2": "value2",
//   "Param3": "value3"
// }'