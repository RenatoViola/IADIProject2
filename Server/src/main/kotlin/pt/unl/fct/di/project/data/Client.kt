package pt.unl.fct.di.project.data

import jakarta.persistence.CascadeType
import jakarta.persistence.Entity
import jakarta.persistence.OneToMany

@Entity
class ClientDAO(
        username: String,
        password: String,
        email: String,
        pictureUrl: String,
        phoneNumber: String,

        @OneToMany(mappedBy = "client", cascade = [CascadeType.ALL])
        val reservations: List<ReservationDAO>

) : UserDAO(username, password, email, pictureUrl, phoneNumber, Role.CLIENT)
