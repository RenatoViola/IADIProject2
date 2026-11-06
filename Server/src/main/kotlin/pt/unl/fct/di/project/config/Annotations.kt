package pt.unl.fct.di.project.config

import org.springframework.security.access.prepost.PreAuthorize


@Target(AnnotationTarget.FUNCTION)
@Retention(AnnotationRetention.RUNTIME)
@PreAuthorize("@mySecurityService.isTheUser(authentication, #username)")
annotation class IsTheUser

@Target(AnnotationTarget.FUNCTION)
@Retention(AnnotationRetention.RUNTIME)
@PreAuthorize("@mySecurityService.isTheOwner(authentication, #ownerUsername)")
annotation class IsTheOwner

@Target(AnnotationTarget.FUNCTION)
@Retention(AnnotationRetention.RUNTIME)
@PreAuthorize("@mySecurityService.isOwnerOfApartment(authentication, #ownerUsername, #apartmentId)")
annotation class IsOwnerOfApartment

@Target(AnnotationTarget.FUNCTION)
@Retention(AnnotationRetention.RUNTIME)
@PreAuthorize("@mySecurityService.isTheClient(authentication, #clientUsername)")
annotation class IsTheClient

@Target(AnnotationTarget.FUNCTION)
@Retention(AnnotationRetention.RUNTIME)
@PreAuthorize("@mySecurityService.canCancelReservation(authentication, #clientUsername, #reservationId)")
annotation class CanCancelReservation

@Target(AnnotationTarget.FUNCTION)
@Retention(AnnotationRetention.RUNTIME)
@PreAuthorize("@mySecurityService.canPublishReview(authentication, #clientUsername, #reservationId)")
annotation class CanPublishReview

@Target(AnnotationTarget.FUNCTION)
@Retention(AnnotationRetention.RUNTIME)
@PreAuthorize("@mySecurityService.canViewReservation(authentication, #reservationId)")
annotation class CanViewReservation

@Target(AnnotationTarget.FUNCTION)
@Retention(AnnotationRetention.RUNTIME)
@PreAuthorize("@mySecurityService.canConfirmOrRejectReservation(authentication, #reservationId)")
annotation class CanConfirmOrRejectReservation

@Target(AnnotationTarget.FUNCTION)
@Retention(AnnotationRetention.RUNTIME)
@PreAuthorize("@mySecurityService.canCheckIn(authentication, #reservationId)")
annotation class CanCheckIn

@Target(AnnotationTarget.FUNCTION)
@Retention(AnnotationRetention.RUNTIME)
@PreAuthorize("@mySecurityService.canCheckOut(authentication, #reservationId)")
annotation class CanCheckOut