import { useUserSelector } from "../store/hooks"

export const ClientArea = (props: any) => {

    const isClient: boolean = useUserSelector(state => state.role == 'CLIENT')
    const isAuthenticated: boolean = useUserSelector(state => state.isAuthenticated);

    return (isClient && isAuthenticated) ? <> {props.children} </> : <></>
}