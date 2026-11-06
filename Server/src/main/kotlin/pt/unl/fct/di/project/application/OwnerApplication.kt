package pt.unl.fct.di.project.application

import org.springframework.stereotype.Component
import pt.unl.fct.di.project.data.*
import pt.unl.fct.di.project.service.ApartmentService
import pt.unl.fct.di.project.service.OwnerService

@Component
class OwnerApplication(val ownerService: OwnerService, val apartmentService: ApartmentService) {

    fun getOwner(username: String): UserDTO = ownerService.getOwner(username).toDTO()

    fun getAllOwners(): List<UserDTO> = ownerService.getAllOwners().map { it.toDTO() }.toList()

    fun addPeriod(id: Long, period: PeriodDTO) = apartmentService.addPeriod(id, period)

    fun getApartmentsOfOwner(username: String, page: Int): Map<String, Any> {
        val pageResult = apartmentService.getApartmentsByOwnerUsername(username, page)

        val response = HashMap<String, Any>()
        response["data"] = pageResult.content.map { it.toDTO() }
        response["currentPage"] = pageResult.number
        response["totalPages"] = pageResult.totalPages
        response["isLastPage"] = !pageResult.hasNext()

        return response
    }

}