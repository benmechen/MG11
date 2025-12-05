import { Text, View, Image } from "@react-pdf/renderer";

interface ISignature {
  url?: string;
}
export const Signature = ({ url }: ISignature) => (
  <View
    style={{
      display: "flex",
      flexDirection: "row",
      gap: "6pt",
      flexGrow: 1,
    }}
  >
    <Text>Signature:</Text>
    {url ? (
      <Image
        src={url}
        style={{
          width: "60pt",
        }}
      />
    ) : (
      <View
        style={{
          flexGrow: 1,
          borderBottom: "1px dotted black",
        }}
      ></View>
    )}
  </View>
);
