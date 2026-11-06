package pt.unl.fct.di.project.boot

import jakarta.transaction.Transactional
import org.springframework.boot.CommandLineRunner
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import pt.unl.fct.di.project.data.*
import pt.unl.fct.di.project.domain.*
import java.time.LocalDate

@Component
@Order(1)
class InitManagers(val userRepository: UserRepository) : CommandLineRunner {
    @Transactional
    override fun run(vararg args: String?) {

        val manager = ManagerDAO(
            username = "manager1",
            password = "password1",
            email = "manager1@example.com",
            pictureUrl = "http://example.com/picture1.jpg",
            phoneNumber = "123-456-7890"
        )

        userRepository.save(manager)
    }
}

@Component
@Order(2)
class InitClients(val userRepository: UserRepository) : CommandLineRunner {
    @Transactional
    override fun run(vararg args: String?) {

        val client1 = ClientDAO(
            username = "johnDoe",
            password = "password123",
            email = "john.doe@email.com",
            pictureUrl = "http://example.com/pictures/johnDoe.jpg",
            phoneNumber = "123-456-7890",
            reservations = listOf()
        )

        val client2 = ClientDAO(
            username = "janeDoe",
            password = "password321",
            email = "jane.doe@email.com",
            pictureUrl = "http://example.com/pictures/janeDoe.jpg",
            phoneNumber = "987-654-3210",
            reservations = listOf()
        )

        val client3 = ClientDAO(
            username = "mikeSmith",
            password = "mySecurePass1",
            email = "mike.smith@email.com",
            pictureUrl = "http://example.com/pictures/mikeSmith.jpg",
            phoneNumber = "456-789-0123",
            reservations = listOf()
        )

        val client4 = ClientDAO(
            username = "lisaJones",
            password = "superSecure123",
            email = "lisa.jones@email.com",
            pictureUrl = "http://example.com/pictures/lisaJones.jpg",
            phoneNumber = "321-654-9870",
            reservations = emptyList()
        )

        val client5 = ClientDAO(
            username = "tomBrown",
            password = "pass12345",
            email = "tom.brown@email.com",
            pictureUrl = "http://example.com/pictures/tomBrown.jpg",
            phoneNumber = "654-321-9876",
            reservations = listOf()
        )

        val clients = listOf(client1, client2, client3, client4, client5)
        userRepository.saveAll(clients)
    }
}


@Component
@Order(3)
class InitOwners(val userRepository: UserRepository) : CommandLineRunner {
    @Transactional
    override fun run(vararg args: String?) {

        val owner1 = OwnerDAO(
            username = "alexWright",
            password = "alexPass123",
            email = "alex.wright@email.com",
            pictureUrl = "http://example.com/pictures/alexWright.jpg",
            phoneNumber = "321-123-4567",
            apartments = listOf()
        )

        val owner2 = OwnerDAO(
            username = "rachelGreen",
            password = "rachelPass123",
            email = "rachel.green@email.com",
            pictureUrl = "http://example.com/pictures/rachelGreen.jpg",
            phoneNumber = "654-765-4321",
            apartments = listOf()
        )

        val owners = listOf(owner1, owner2)
        userRepository.saveAll(owners)
    }
}

@Component
@Order(4)
class InitApartments(val userRepository: UserRepository, val apartmentRepository: ApartmentRepository) : CommandLineRunner {
    @Transactional
    override fun run(vararg args: String?) {
        val owners = userRepository.findByRole(Role.OWNER).toList() as List<OwnerDAO>

        val apartment1 = ApartmentDAO(
            id = 1L,
            name = "Sunny Studio",
            description = "A bright and airy studio in the heart of the city.",
            location = "123 Main St, Cityville",
            amenities = "Wi-Fi, Air Conditioning, Kitchen",
            pictureUrls = "https://assetsio.reedpopcdn.com/red-dead-redemption-2-modder-finally-adds-way-to-buy-properties-1627037109548.jpg?width=1920&height=1920&fit=bounds&quality=80&format=jpg&auto=webp",
            pricePerNight = 100,
            owner = owners[0],
            periods = listOf(),
            reservations = listOf()
        )

        val apartment2 = ApartmentDAO(
            id = 2L,
            name = "Cozy Cottage",
            description = "A quaint cottage with stunning garden views.",
            location = "456 Oak Lane, Villageville",
            amenities = "Fireplace, Garden, Parking",
            pictureUrls = "https://i.redd.it/us5w2jadyud21.jpg",
            pricePerNight = 120,
            owner = owners[0],
            periods = listOf(),
            reservations = listOf()
        )

        val apartment3 = ApartmentDAO(
            id = 3L,
            name = "Modern Loft",
            description = "A chic loft with all the modern amenities.",
            location = "789 Pine Ave, Cityville",
            amenities = "Wi-Fi, Workspace, Fully-Equipped Kitchen",
            pictureUrls = "https://i.imgur.com/46hsUBv.jpg",
            pricePerNight = 150,
            owner = owners[0],
            periods = listOf(),
            reservations = listOf()
        )

        val apartment4 = ApartmentDAO(
            id = 4L,
            name = "Beach Bungalow",
            description = "A relaxed bungalow just steps from the beach.",
            location = "321 Ocean Dr, Beachtown",
            amenities = "Beach Access, Patio, Grill",
            pictureUrls = "https://cyberpunk-guide.net/site/assets/files/8146/highwayman-garage.jpg",
            pricePerNight = 180,
            owner = owners[1],
            periods = listOf(),
            reservations = listOf()
        )

        val apartment5 = ApartmentDAO(
            id = 5L,
            name = "Lakeside Retreat",
            description = "A serene lakeside property with stunning views.",
            location = "789 Lake Rd, Lake Town",
            amenities = "Wi-Fi, Balcony, Full Kitchen, Lake Access",
            pictureUrls = "https://gamerjournalist.com/wp-content/uploads/2020/12/How-to-get-into-Arasaka-Estate-in-Cyberpunk-2077.jpg",
            pricePerNight = 250,
            owner = owners[0],
            periods = listOf(),
            reservations = listOf()
        )

        val apartment6 = ApartmentDAO(
            id = 6L,
            name = "Meadowview Heights",
            description = "A bright and airy studio in the heart of the city.",
            location = "123 Main St, Cityville",
            amenities = "Wi-Fi, Air Conditioning, Kitchen",
            pictureUrls = "https://vignette.wikia.nocookie.net/reddeadredemption/images/e/e3/Braithwaite-Manor.png/revision/latest?cb=20190725081419",
            pricePerNight = 100,
            owner = owners[0],
            periods = listOf(),
            reservations = listOf()
        )

        val apartment7 = ApartmentDAO(
            id = 7L,
            name = "Sunset Terrace Apartments",
            description = "A quaint cottage with stunning garden views.",
            location = "456 Oak Lane, Villageville",
            amenities = "Fireplace, Garden, Parking",
            pictureUrls = "https://i.redd.it/9xcofjaefdt91.jpg",
            pricePerNight = 120,
            owner = owners[0],
            periods = listOf(),
            reservations = listOf()
        )

        val apartment8 = ApartmentDAO(
            id = 8L,
            name = "Harborview Haven",
            description = "A chic loft with all the modern amenities.",
            location = "789 Pine Ave, Cityville",
            amenities = "Wi-Fi, Workspace, Fully-Equipped Kitchen",
            pictureUrls = "https://pbs.twimg.com/media/EVdvoDmU8AA_AKp?format=jpg&name=large",
            pricePerNight = 150,
            owner = owners[0],
            periods = listOf(),
            reservations = listOf()
        )

        val apartment9 = ApartmentDAO(
            id = 9L,
            name = "Pinecrest Residences",
            description = "A relaxed bungalow just steps from the beach.",
            location = "321 Ocean Dr, Beachtown",
            amenities = "Beach Access, Patio, Grill",
            pictureUrls = "https://i.imgur.com/QE2nzAu.jpg",
            pricePerNight = 180,
            owner = owners[1],
            periods = listOf(),
            reservations = listOf()
        )

        val apartment10 = ApartmentDAO(
            id = 10L,
            name = "Urban Oasis Suites",
            description = "A serene lakeside property with stunning views.",
            location = "789 Lake Rd, Lake Town",
            amenities = "Wi-Fi, Balcony, Full Kitchen, Lake Access",
            pictureUrls = "https://img.atwiki.jp/rdr2jp/attach/714/1517/Pleasance%20House.jpg",
            pricePerNight = 250,
            owner = owners[0],
            periods = listOf(),
            reservations = listOf()
        )

        val apartments = listOf(apartment1, apartment2, apartment3, apartment4, apartment5, apartment6, apartment7, apartment8, apartment9, apartment10)
        apartmentRepository.saveAll(apartments)
    }
}


@Component
@Order(5)
class InitPeriods(val apartmentRepository: ApartmentRepository, val periodRepository: PeriodRepository) : CommandLineRunner
{
    @Transactional
    override fun run(vararg args: String?){

        val apartments = apartmentRepository.findAll().toList()

        val period1 = PeriodDAO(
            apartmentId = apartments[0].id,
            apartment = apartments[0],
            startDate = LocalDate.of(2024, 1, 1),
            endDate = LocalDate.of(2024, 4, 15)
        )

        val period2 = PeriodDAO(
            apartmentId = apartments[1].id,
            apartment = apartments[1],
            startDate = LocalDate.of(2023, 1, 1),
            endDate = LocalDate.of(2023, 12, 1)
        )

        val period3 = PeriodDAO(
            apartmentId = apartments[2].id,
            apartment = apartments[2],
            startDate = LocalDate.of(2023, 1, 1),
            endDate = LocalDate.of(2023, 12, 1)
        )

        val period4 = PeriodDAO(
            apartmentId = apartments[3].id,
            apartment = apartments[3],
            startDate = LocalDate.of(2023, 1, 1),
            endDate = LocalDate.of(2023, 12, 1)
        )

        val period5 = PeriodDAO(
            apartmentId = apartments[0].id,
            apartment = apartments[0],
            startDate = LocalDate.of(2024, 6, 15),
            endDate = LocalDate.of(2024, 9, 1)
        )

        val period6 = PeriodDAO(
            apartmentId = apartments[4].id,
            apartment = apartments[4],
            startDate = LocalDate.of(2024, 6, 15),
            endDate = LocalDate.of(2024, 9, 1)
        )

        val period7 = PeriodDAO(
            apartmentId = apartments[5].id,
            apartment = apartments[5],
            startDate = LocalDate.of(2024, 6, 15),
            endDate = LocalDate.of(2024, 9, 1)
        )

        val period8 = PeriodDAO(
            apartmentId = apartments[6].id,
            apartment = apartments[6],
            startDate = LocalDate.of(2024, 6, 15),
            endDate = LocalDate.of(2024, 9, 1)
        )

        val period9 = PeriodDAO(
            apartmentId = apartments[7].id,
            apartment = apartments[7],
            startDate = LocalDate.of(2024, 6, 15),
            endDate = LocalDate.of(2024, 9, 1)
        )

        val period10 = PeriodDAO(
            apartmentId = apartments[8].id,
            apartment = apartments[8],
            startDate = LocalDate.of(2024, 6, 15),
            endDate = LocalDate.of(2024, 9, 1)
        )

        val period11 = PeriodDAO(
            apartmentId = apartments[9].id,
            apartment = apartments[9],
            startDate = LocalDate.of(2024, 6, 15),
            endDate = LocalDate.of(2024, 9, 1)
        )

        periodRepository.saveAll(listOf(period1, period2, period3, period4, period5, period6, period7, period8, period9, period10, period11))
        apartmentRepository.saveAll(apartments)
    }

}