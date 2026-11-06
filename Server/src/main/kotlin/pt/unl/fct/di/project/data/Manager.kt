package pt.unl.fct.di.project.data

import jakarta.persistence.Entity

@Entity
class ManagerDAO(

    username: String,
    password: String,
    email: String,
    pictureUrl: String,
    phoneNumber: String

) : UserDAO(username, password, email, pictureUrl, phoneNumber, Role.MANAGER)


