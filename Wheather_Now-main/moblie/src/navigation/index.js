// navigation/index.js — Árvore de navegação completa do aplicativo
//
// Estrutura:
//   RootStack (Stack)
//   ├── DisfarceStack (Stack)  ← tela de clima (disfarce público)
//   │   └── ClimaTela
//   ├── Pin (Stack)            ← tela de PIN (acesso protegido)
//   └── Reservada (Drawer)    ← área interna, acessível após PIN correto
//       ├── TabReservada (Tab) ← abas principais da área secreta
//       │   ├── Ocorrencias   (Tab 1) + sub-Stack com Formulario
//       │   └── SOS           (Tab 2)
//       └── Sobre             (Drawer item extra)

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Text } from "react-native";

import ClimaTela from "../screens/ClimaTela";
import PinTela from "../screens/PinTela";
import OcorrenciasTela from "../screens/reservada/OcorrenciasTela";
import FormularioTela from "../screens/reservada/FormularioTela";
import SOSTela from "../screens/reservada/SOSTela";
import SobreTela from "../screens/reservada/SobreTela";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// ── Opções visuais compartilhadas ───────────────────────────────────────────
const screenOptions = {
  headerStyle: { backgroundColor: "#07111f" },
  headerTintColor: "#f4f7ff",
  headerTitleStyle: { fontWeight: "700" },
};

const tabBarStyle = {
  backgroundColor: "#0b1525",
  borderTopColor: "#1d2d44",
  paddingBottom: 8,
  height: 56,
};

// ── Stack interno de Ocorrências (lista + formulário) ───────────────────────
function OcorrenciasStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Lista"
        component={OcorrenciasTela}
        options={{ title: "Registros" }}
      />
      <Stack.Screen
        name="Formulario"
        component={FormularioTela}
        options={({ route }) =>
          route.params?.ocorrencia
            ? { title: "Editar Registro" }
            : { title: "Novo Registro" }
        }
      />
    </Stack.Navigator>
  );
}

// ── Tab Navigator da área reservada ────────────────────────────────────────
function TabReservada() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle,
        tabBarActiveTintColor: "#79e3d1",
        tabBarInactiveTintColor: "#6b7fa0",
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
      }}
    >
      <Tab.Screen
        name="OcorrenciasTab"
        component={OcorrenciasStack}
        options={{
          tabBarLabel: "Registros",
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>📋</Text>,
        }}
      />
      <Tab.Screen
        name="SOS"
        component={SOSTela}
        options={{
          tabBarLabel: "SOS",
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>🆘</Text>,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

// ── Drawer Navigator da área reservada ─────────────────────────────────────
function DrawerReservada() {
  return (
    <Drawer.Navigator
      screenOptions={{
        ...screenOptions,
        drawerStyle: { backgroundColor: "#0b1525" },
        drawerActiveTintColor: "#79e3d1",
        drawerInactiveTintColor: "#a5b4cc",
        drawerLabelStyle: { fontWeight: "600" },
      }}
    >
      <Drawer.Screen
        name="Inicio"
        component={TabReservada}
        options={{
          title: "Área Reservada",
          drawerLabel: "📋  Registros & SOS",
          headerTitle: "Área Reservada",
        }}
      />
      <Drawer.Screen
        name="Sobre"
        component={SobreTela}
        options={{
          drawerLabel: "ℹ️   Sobre o App",
          title: "Sobre",
        }}
      />
    </Drawer.Navigator>
  );
}

// ── Stack raiz ──────────────────────────────────────────────────────────────
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Tela de disfarce — pública */}
        <Stack.Screen name="DisfarceStack" component={ClimaTela} />

        {/* PIN — empilhado sobre o disfarce */}
        <Stack.Screen
          name="Pin"
          component={PinTela}
          options={{ presentation: "modal", animation: "slide_from_bottom" }}
        />

        {/* Área reservada — Drawer com Tabs dentro */}
        <Stack.Screen name="Reservada" component={DrawerReservada} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
