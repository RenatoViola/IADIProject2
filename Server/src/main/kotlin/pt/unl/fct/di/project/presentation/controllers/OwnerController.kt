package pt.unl.fct.di.project.presentation.controllers

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController
import pt.unl.fct.di.project.application.OwnerApplication
import pt.unl.fct.di.project.data.ApartmentDTO
import pt.unl.fct.di.project.data.PeriodDTO
import pt.unl.fct.di.project.data.UserDTO
import pt.unl.fct.di.project.presentation.apis.OwnersAPI

@RestController
class OwnerController(val ownerApplication: OwnerApplication) : OwnersAPI{

    override fun addOwner(owner: UserDTO) {}

    override fun updateOwner(ownerUsername: String, owner: UserDTO) {}

    override fun deleteOwner(ownerUsername: String) {}

    override fun addApartment(ownerUsername: String, apartment: ApartmentDTO) {}

    override fun updateApartment(ownerUsername: String, apartmentId: Long, apartment: ApartmentDTO) {}

    override fun deleteApartment(ownerUsername: String, apartmentId: Long) {}

    override fun getOwners(): ResponseEntity<List<UserDTO>>
    {
        val res = ownerApplication.getAllOwners()
        return ResponseEntity.ok(res)
    }

    override fun getOwner(ownerUsername: String): ResponseEntity<UserDTO>
    {
        val res = ownerApplication.getOwner(ownerUsername)
        return ResponseEntity.ok(res)
    }

    override fun addPeriod(ownerUsername: String, apartmentId: Long, period: PeriodDTO): ResponseEntity<Any>
    {
        val res = ownerApplication.addPeriod(apartmentId, period)
        return ResponseEntity.ok(res)
    }

    override fun getApartmentsOfOwner(ownerUsername: String, page: Int): ResponseEntity<Map<String, Any>>
    {
        val res = ownerApplication.getApartmentsOfOwner(ownerUsername, page)
        return ResponseEntity.ok(res)
    }

}
