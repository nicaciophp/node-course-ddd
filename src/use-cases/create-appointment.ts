import { Appointment } from "../entities/appointment";
import { AppointmentsRepository } from "../repositories/appointments-respository.interface";

interface CreateAppointmentRequest {
    customer: string;
    startsAt: Date;
    endsAt: Date;
}

type CreateAppointmentResponse = Appointment

export class CreateAppointment {
    constructor(private appointmentRepository: AppointmentsRepository) {}

    async execute({ 
        customer,
         startsAt,
          endsAt 
        }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {

        const overlappingAppointment = await this.appointmentRepository.findOverlappingAppointment(startsAt, endsAt);

        if(overlappingAppointment) {
            throw new Error("Appointment already exists");
        }
        
        const appointment = new Appointment(customer, startsAt, endsAt );

        await this.appointmentRepository.create(appointment);
    }
}