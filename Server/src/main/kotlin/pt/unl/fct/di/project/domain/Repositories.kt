package pt.unl.fct.di.project.domain

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.CrudRepository
import pt.unl.fct.di.project.data.*

interface ApartmentRepository : JpaRepository<ApartmentDAO, Long>{
    override fun findAll(pageable: Pageable): Page<ApartmentDAO>

    fun findByOwnerUsername(ownerUsername: String, pageable: Pageable): Page<ApartmentDAO>
}

interface UserRepository : CrudRepository<UserDAO, String>{
    fun findByRole(role: Role): List<UserDAO>
}

interface ReservationRepository : CrudRepository<ReservationDAO, Long>

interface PeriodRepository : CrudRepository<PeriodDAO, PeriodKey>{
    fun findAllByApartmentId(apartmentId: Long): List<PeriodDAO>
}