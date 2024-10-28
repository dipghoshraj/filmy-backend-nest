import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';


@Processor('sendotp')
export class AudioProcessor extends WorkerHost {

    async process(job: Job<any, any, string>): Promise<any>{
        console.log(job.data)
    }
}