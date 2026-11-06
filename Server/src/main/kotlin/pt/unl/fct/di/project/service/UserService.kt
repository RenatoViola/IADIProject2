package pt.unl.fct.di.project.service

import org.springframework.stereotype.Service
import java.util.*

data class User(val username:String, val password:String) {
    constructor() : this("user", "pass") {}
}

@Service
class UserService {

    val users : MutableList<User> = mutableListOf() // To be mapped onto the database

    fun addUser(user: User): Optional<User> {
        users.add(user)
        return Optional.of(user)
    }

}