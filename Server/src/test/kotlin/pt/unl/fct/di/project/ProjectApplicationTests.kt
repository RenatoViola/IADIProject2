package pt.unl.fct.di.project

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.jsonMapper
import org.hamcrest.Matchers
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.core.io.buffer.DataBufferUtils.Matcher
import org.springframework.http.MediaType
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get
import pt.unl.fct.di.project.domain.ReservationRepository
import pt.unl.fct.di.project.domain.UserRepository

@SpringBootTest
@AutoConfigureMockMvc
class ProjectApplicationTests {

    @Autowired lateinit var mvc: MockMvc
    @MockBean lateinit var users : UserRepository

    //val listUsers = listOf("client1", "client2")

    @Test
    fun `basic REST test`() {
        mvc.get("/clients")
            .andDo { print() }
            .andExpect { status { isOk() } }
            .andExpect { content { contentType(MediaType.APPLICATION_JSON) } }
            .andExpect { jsonPath("$[0].username", Matchers.`is`("johnDoe")) }
            .andExpect { jsonPath("$[1].username", Matchers.`is`("janeDoe")) }

    }


}
