// App.js — ponto de entrada do aplicativo Weather Now (Entrega 2)
//
// Envolve toda a aplicação com:
//   • GestureHandlerRootView  — exigido pelo react-navigation/drawer
//   • Provider (Redux)        — estado global (ocorrências + autenticação)
//   • AppNavigator            — árvore Stack / Tab / Drawer
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "./src/store";
import AppNavigator from "./src/navigation";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </GestureHandlerRootView>
  );
}
