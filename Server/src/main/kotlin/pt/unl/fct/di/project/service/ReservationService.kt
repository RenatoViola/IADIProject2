package pt.unl.fct.di.project.service

import jakarta.transaction.Transactional
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import pt.unl.fct.di.project.data.*
import pt.unl.fct.di.project.domain.ReservationRepository
import pt.unl.fct.di.project.presentation.exceptions.NoReservationsFoundException
import pt.unl.fct.di.project.presentation.exceptions.ReservationNotFoundException
import pt.unl.fct.di.project.presentation.exceptions.ReviewNotFoundException
import java.time.LocalDate
import java.time.temporal.ChronoUnit.DAYS

@Service
class ReservationService(
    val reservationRepository: ReservationRepository,
    val clientService: ClientService,
    val apartmentService: ApartmentService
)
{
    @Transactional
    fun addReservation(reservationDTO: ReservationDTO): Long {
        val clientEntity = clientService.getClient(reservationDTO.client.username)
        val apartmentEntity = apartmentService.getApartment(reservationDTO.apartment.id)

        // val reservationPrice = DAYS.between(reservationDTO.startDate, reservationDTO.endDate).toInt() * apartmentEntity.pricePerNight * reservationDTO.numberOfPeople

        val reservationDAO = ReservationDAO(
            startDate = reservationDTO.startDate,
            endDate = reservationDTO.endDate,
            numberOfPeople = reservationDTO.numberOfPeople,
            price = reservationDTO.price,
            client = clientEntity,
            apartment = apartmentEntity,
        )

        val res = reservationRepository.save(reservationDAO)
        reservationDAO.history.add(StatusDAO(res.id, LocalDate.now(), reservationDTO.status, res))

        return res.id
    }

    fun getReservation(id: Long): ReservationDAO =
        reservationRepository.findByIdOrNull(id)?: throw ReservationNotFoundException()

    fun getAllReservations(): Iterable<ReservationDAO> {
        val res = reservationRepository.findAll()
        if(res.none()) throw NoReservationsFoundException()

        return res
    }

    fun getReview(id: Long): ReviewDAO =
        this.getReservation(id).review?: throw ReviewNotFoundException()

    @Transactional
    fun publishReview(id: Long, reviewDTO: ReviewDTO) {
        val reservationDAO = this.getReservation(id)

        reservationDAO.review = ReviewDAO(reservationDAO.id, reviewDTO.text, reviewDTO.rating, reservationDAO)
        reservationDAO.history.add(StatusDAO(id, LocalDate.now(), StatusType.CLOSED, reservationDAO))

        reservationRepository.save(reservationDAO)
    }

    fun getStatusHistory(id: Long): List<StatusDAO> = this.getReservation(id).history

    @Transactional
    fun setStatus(id: Long, status: StatusType): ReservationDAO {
        val reservationDAO = this.getReservation(id)

        reservationDAO.history.add(StatusDAO(id, LocalDate.now(), status, reservationDAO))
        reservationRepository.save(reservationDAO)

        return reservationDAO
    }

}