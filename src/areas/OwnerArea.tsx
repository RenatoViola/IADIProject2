import { useUserSelector } from "../store/hooks"

export const OwnerArea = (props: any) => {

    const isOwner: boolean = useUserSelector(state => state.role == 'OWNER')
    const isAuthenticated: boolean = useUserSelector(state => state.isAuthenticated);

    return (isOwner && isAuthenticated) ? <> {props.children} </> : <></>
}