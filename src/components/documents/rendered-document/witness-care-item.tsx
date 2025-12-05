import { View, Text } from "@react-pdf/renderer";

interface IWitnessCareItem {
  children: React.ReactNode;
  value: string;
}
export const WitnessCareItem = ({ children, value }: IWitnessCareItem) => (
  <View
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: "4pt",
    }}
  >
    <Text style={{ maxWidth: "90%" }}>{children}</Text>
    <Text>{value}</Text>
  </View>
);
