import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="myTickets"
                options={{
                    tabBarLabel: "My Tickets",
                    title: "My Tickets"
                }}
            />
            <Tabs.Screen
                name="allTickets"
                options={{
                    tabBarLabel: "All Tickets",
                    title: "All Tickets"
                }}
            />
        </Tabs>
    );
}
