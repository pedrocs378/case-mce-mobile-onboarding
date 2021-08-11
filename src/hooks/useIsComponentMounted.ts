import { useCallback, useState } from "react";

export function useIsComponentMounted() {
	const [isStackRoutesMounted, setIsStackRoutesMounted] = useState(true)
	const [isAuthRoutesMounted, setIsAuthRoutesMounted] = useState(true)

	const setStackRoutesMounted = useCallback((value: boolean) => {
		setIsStackRoutesMounted(value)
	}, [])

	const setAuthRoutesMounted = useCallback((value: boolean) => {
		setIsAuthRoutesMounted(value)
	}, [])

	return {
		isStackRoutesMounted,
		isAuthRoutesMounted,
		setStackRoutesMounted,
		setAuthRoutesMounted
	}
}