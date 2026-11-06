package pt.unl.fct.di.project.service

import jakarta.transaction.Transactional
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import pt.unl.fct.di.project.data.*
import pt.unl.fct.di.project.domain.ApartmentRepository
import pt.unl.fct.di.project.domain.PeriodRepository
import pt.unl.fct.di.project.presentation.exceptions.ApartmentNotFoundException
import pt.unl.fct.di.project.presentation.exceptions.ForbiddenPeriodException
import pt.unl.fct.di.project.presentation.exceptions.InvalidDataException
import pt.unl.fct.di.project.presentation.exceptions.NoApartmentsFoundException

@Service
class ApartmentService(val apartmentRepository: ApartmentRepository, val periodRepository: PeriodRepository) {

    fun getApartment(id: Long): ApartmentDAO =
        apartmentRepository.findByIdOrNull(id)?: throw ApartmentNotFoundException()

    fun getAllApartments(page: Int): Page<ApartmentDAO> {
        val pageSize = 4
        val res = apartmentRepository.findAll(PageRequest.of(page, pageSize))
        if (res.none()) throw NoApartmentsFoundException()

        return res
    }

    fun getApartmentsByOwnerUsername(ownerUsername: String, page: Int): Page<ApartmentDAO> {
        val pageSize = 4
        return apartmentRepository.findByOwnerUsername(ownerUsername, PageRequest.of(page, pageSize))
    }

    fun getCalendar(id: Long): List<PeriodDAO> = periodRepository.findAllByApartmentId(id).sortedBy { it.startDate }

    fun getReservationsOfApartment(id: Long): List<ReservationDAO> = this.getApartment(id).reservations

    fun getReviewsOfApartment(id: Long): List<ReviewDAO> = this.getApartment(id).reservations.mapNotNull { it.review }

    @Transactional
    fun addPeriod(id: Long, period: PeriodDTO) {
        if (period.startDate.isAfter(period.endDate)) throw InvalidDataException()

        val apartment = this.getApartment(id)

        val periodDAO = PeriodDAO(id, period.startDate, period.endDate, apartment)

        // Save the new period
        periodRepository.save(periodDAO)

        // Fetch periods, including the newly added one
        val allPeriods = periodRepository.findAllByApartmentId(id)

        // Merge adjacent periods
        val mergedPeriods = mergeAdjacentPeriods(allPeriods)

        // Find periods that need to be removed (those that are in allPeriods but not in mergedPeriods)
        val periodsToRemove = allPeriods - mergedPeriods.toSet()

        // Delete the periods that are no longer needed
        periodRepository.deleteAll(periodsToRemove)

        // Save the merged periods
        periodRepository.saveAll(mergedPeriods)
    }

    fun mergeAdjacentPeriods(periods: List<PeriodDAO>): List<PeriodDAO> {
        if (periods.size <= 1) return periods

        val sortedPeriods = periods.sortedBy { it.startDate }
        val mergedPeriods = mutableListOf<PeriodDAO>()

        var currentPeriod = sortedPeriods[0]

        for (i in 1 until sortedPeriods.size) {
            val nextPeriod = sortedPeriods[i]
            if (currentPeriod.canBeMerged(nextPeriod)) {
                currentPeriod = currentPeriod.merge(nextPeriod)
            } else {
                mergedPeriods.add(currentPeriod)
                currentPeriod = nextPeriod
            }
        }
        mergedPeriods.add(currentPeriod)

        return mergedPeriods
    }

    @Transactional
    fun periodSubtractAndReplace(reservationDTO: ReservationDTO) {
        val apartment = this.getApartment(reservationDTO.apartment.id)

        val startDate = reservationDTO.startDate
        val endDate = reservationDTO.endDate

        val periods = periodRepository.findAllByApartmentId(apartment.id)
        val periodToSubtract = periods.findLast { it.contains(startDate, endDate) }?: throw Exception()
        val difference = periodToSubtract.subtract(startDate, endDate)

        periodRepository.delete(periodToSubtract)
        periodRepository.saveAll(difference)
    }

    fun checkIfAnyPeriodContainsReservation(reservationDTO: ReservationDTO) {
        val apartmentCalendar = this.getCalendar(reservationDTO.apartment.id)
        val noAvailabilityForReservation = apartmentCalendar.none { it.contains(reservationDTO.startDate, reservationDTO.endDate) }

        if (noAvailabilityForReservation) {
            throw ForbiddenPeriodException()
        }
    }

}