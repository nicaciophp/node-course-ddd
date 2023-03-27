import { describe, it, expect } from 'vitest';
import { CreateAppointment } from './create-appointment';
import { getFutureDate } from '../tests/utils/get-future-date';
import { InMemoryAppointmentRepository } from '../repositories/in-memory/in-memory-appointments-repository';
import { Appointment } from '../entities/appointment';

describe('Create Appointment', () => {
    it('should be able to create an appointment', async () => {
        const appointmentsRepository = new InMemoryAppointmentRepository();
        const createAppointment = new CreateAppointment(appointmentsRepository);

        const startsAt = getFutureDate('2022-08-10');
        const endsAt = getFutureDate('2022-08-11');

        // expect(await createAppointment.execute({
        //     customer: 'Jhon Dow',
        //     startsAt,
        //     endsAt
        // })).toBeInstanceOf(Appointment);
    })

    it('should not be able to create an appointment with overlapping dates', async () => {
        const appointmentsRepository = new InMemoryAppointmentRepository();
        const createAppointment = new CreateAppointment(appointmentsRepository);

        const startsAt = getFutureDate('2022-08-10');
        const endsAt = getFutureDate('2022-08-15');

        await createAppointment.execute({
            customer: 'Jhon Dow',
            startsAt,
            endsAt
        })

        expect(createAppointment.execute({
            customer: 'Jhon Dow',
            startsAt: getFutureDate('2022-08-14'),
            endsAt: getFutureDate('2022-08-18'),
        })).rejects.toBeInstanceOf(Error);
    })
})