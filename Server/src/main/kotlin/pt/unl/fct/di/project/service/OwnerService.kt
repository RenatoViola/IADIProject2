package pt.unl.fct.di.project.service

import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import pt.unl.fct.di.project.data.OwnerDAO
import pt.unl.fct.di.project.data.Role
import pt.unl.fct.di.project.domain.UserRepository
import pt.unl.fct.di.project.presentation.exceptions.OwnerNotFoundException
import pt.unl.fct.di.project.presentation.exceptions.NoOwnersFoundException

@Service
class OwnerService(val userRepository: UserRepository) {

    fun getOwner(username: String): OwnerDAO {
        val owner = (userRepository.findByIdOrNull(username)?: throw OwnerNotFoundException())
        if (owner is OwnerDAO) {
            return owner
        } else {
            throw OwnerNotFoundException()
        }
    }

    fun getAllOwners(): List<OwnerDAO> {
        val res = userRepository.findByRole(Role.OWNER)
        if(res.none()) throw NoOwnersFoundException()

        return res as List<OwnerDAO>
    }

}