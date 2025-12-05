import { View, Text } from "@react-pdf/renderer";
import { ChequeredPattern } from "./chequered";

interface IHeader {
  showPattern?: boolean;
  showYear?: boolean;
  showFormName?: boolean;
}
export const Header = ({ showPattern, showYear, showFormName }: IHeader) => (
  <View
    style={{
      position: "relative",
      display: "flex",
      justifyContent: "center",
      height: "30pt",
    }}
  >
    {showPattern && <ChequeredPattern />}

    <View
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: "10pt",
      }}
    >
      <View
        style={{
          borderWidth: showYear ? "1px" : "0px",
          borderColor: "black",
          textAlign: "center",
          paddingVertical: "4pt",
          backgroundColor: "white",
        }}
      >
        {showYear && (
          <Text
            style={{
              fontSize: "8pt",
              fontFamily: "Helvetica-Bold",
              paddingHorizontal: "4pt",
              paddingVertical: "2pt",
              textAlign: "center",
            }}
          >
            99/12
          </Text>
        )}
      </View>
      <View
        style={{
          borderWidth: "1px",
          borderColor: "black",
          width: "250pt",
          paddingVertical: "4pt",
          textAlign: "center",
          backgroundColor: "white",
        }}
      >
        <Text
          style={{
            fontSize: "12pt",
            fontFamily: "Helvetica-Bold",
          }}
        >
          RESTRICTED (when complete)
        </Text>
      </View>
      <View
        style={{
          borderWidth: showFormName ? "1px" : "0px",
          borderColor: "black",
          textAlign: "center",
          paddingVertical: "4pt",
          backgroundColor: "white",
        }}
      >
        {showFormName && (
          <Text
            style={{
              fontSize: "8pt",
              fontFamily: "Helvetica-Bold",
              paddingHorizontal: "4pt",
              paddingVertical: "2pt",
              textAlign: "center",
            }}
          >
            MG11C
          </Text>
        )}
      </View>
    </View>
  </View>
);
