package pt.unl.fct.di.project.service

import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import pt.unl.fct.di.project.data.ClientDAO
import pt.unl.fct.di.project.data.Role
import pt.unl.fct.di.project.domain.UserRepository
import pt.unl.fct.di.project.presentation.exceptions.ClientNotFoundException
import pt.unl.fct.di.project.presentation.exceptions.NoClientsFoundException


@Service
class ClientService(val userRepository: UserRepository) {

    fun getClient(username: String): ClientDAO {
        val client = (userRepository.findByIdOrNull(username)?: throw ClientNotFoundException())
        if (client is ClientDAO) {
            return client
        } else {
            throw ClientNotFoundException()
        }
    }


    fun getAllClients(): List<ClientDAO> {
        val res = userRepository.findByRole(Role.CLIENT)
        if (res.none()) throw NoClientsFoundException()

        return res as List<ClientDAO>
    }

}