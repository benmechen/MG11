import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import { Header } from "./header";
import { renderAge } from "./utils";
import { Signature } from "./signature";

interface IRenderedDocument {
  witness: {
    forenames: string;
    surname: string;
    dateOfBirth: Date;
    occupation: string;
  };
  metadata: {
    createdAt: Date;
    signatureUrl: string | null;
  };
  statement: string;
}
export const RenderedDocument = ({
  witness,
  metadata,
  statement,
}: IRenderedDocument) => (
  <Document>
    <Page
      size="A4"
      style={{
        paddingTop: "26pt",
        paddingBottom: "100pt",
        paddingHorizontal: "46pt",
        fontSize: "10pt",
        height: "100%",
      }}
    >
      <View style={{ marginBottom: "10pt" }} fixed>
        <Header showPattern showFormName />
      </View>

      <View
        style={{
          borderWidth: "1px",
          borderColor: "black",
          width: "100%",
          marginTop: "10pt",
          paddingTop: "10pt",
          paddingBottom: "6pt",
          paddingHorizontal: "6pt",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: "12pt",
            fontFamily: "Helvetica-Bold",
          }}
        >
          WITNESS STATEMENT
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "Helvetica-Bold",
            paddingTop: "4pt",
          }}
        >
          Criminal Procedure Rules, r 27.2; Criminal Justice Act 1967, s. 9;
          Magistrates' Courts Act 1980, s.5B
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "6pt",
            paddingTop: "4pt",
          }}
        >
          <Text>URN</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                border: "1px solid grey",
                height: "18pt",
                width: "24pt",
                borderRightWidth: 0,
              }}
            ></View>
            <View
              style={{
                border: "1px solid grey",
                height: "18pt",
                width: "24pt",
                borderRightWidth: 0,
              }}
            ></View>
            <View
              style={{
                border: "1px solid grey",
                height: "18pt",
                width: "48pt",
                borderRightWidth: 0,
              }}
            ></View>
            <View
              style={{
                border: "1px solid grey",
                height: "18pt",
                width: "24pt",
              }}
            ></View>
          </View>
        </View>
        <Text
          style={{
            paddingTop: "4pt",
          }}
        >
          Statement of: {witness.forenames} {witness.surname}
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "24pt",
          }}
        >
          <Text
            style={{
              paddingTop: "4pt",
              width: "50%",
            }}
          >
            Age if under 18: {renderAge(witness.dateOfBirth)}
          </Text>
          <Text
            style={{
              paddingTop: "4pt",
            }}
          >
            Occupation: {witness.occupation}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderWidth: "1px",
          borderColor: "black",
          borderTopWidth: "0px",
          padding: "6pt",
        }}
      >
        <Text
          render={({ totalPages }) =>
            `This statement (consisting of ${totalPages} page(s) each signed by me) is true to the best of my knowledge and belief and I make it knowing that, if it is tendered in evidence, I shall be liable to prosecution if I have wilfully stated in it anything which I know to be false, or do not believe to be true.`
          }
        />

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "12pt",
            gap: "12pt",
          }}
        >
          <Signature url={metadata.signatureUrl} />
          <Text>
            Date:{" "}
            {metadata.createdAt.toLocaleDateString("en-GB", {
              day: "numeric",
              weekday: "long",
              month: "long",
              year: "numeric",
            })}
          </Text>
        </View>
      </View>
      <View
        style={{
          paddingVertical: "12pt",
        }}
      >
        <Text>{statement}</Text>
      </View>
      <View
        fixed
        style={{
          position: "absolute",
          width: "100%",
          maxWidth: "100%",
          bottom: "20pt",
          left: 0,
          paddingHorizontal: "46pt",
        }}
      >
        <Signature url={metadata.signatureUrl} />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "12pt",
            marginTop: "6pt",
          }}
        >
          <Text>Signature witnessed by:</Text>
          <View
            style={{
              flexGrow: 1,
              borderBottom: "1px dotted black",
            }}
          ></View>
        </View>
        <Text
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
          style={{
            fontSize: "8pt",
            textAlign: "right",
            marginVertical: "4pt",
          }}
        />
        <Header showPattern showYear />
      </View>
    </Page>

    {/* <Page
      size="A4"
      style={{
        paddingVertical: "26pt",
        paddingHorizontal: "46pt",
        fontSize: "10pt",
      }}
    >
      <Header showPattern showFormName />
      <View
        style={{
          borderWidth: "1px",
          borderColor: "black",
          width: "100%",
          marginTop: "20pt",
          paddingVertical: "10pt",
          paddingHorizontal: "6pt",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View style={{ width: "50%", display: "flex", gap: "10pt" }}>
            <Text
              style={{
                textDecoration: "underline",
                marginBottom: "10pt",
                fontFamily: "Helvetica-Bold",
              }}
            >
              Witness contact details
            </Text>
            <Text>Name of witness:</Text>
            <Text>Home Address:</Text>
            <Text>E-mail Address:</Text>
            <Text>Home Telephone Number:</Text>
            <Text>Preferred means of contact:</Text>
            <Text>Former name:</Text>
          </View>
          <View style={{ width: "50%", display: "flex", gap: "10pt" }}>
            <Text style={{ marginBottom: "10pt" }}>URN:</Text>
            <Text>Postcode:</Text>
            <Text>Mobile:</Text>
            <Text>Work Telephone Number:</Text>
            <Text>Date and place of birth:</Text>
            <Text>Ethnicity Code (16 + 1):</Text>
          </View>
        </View>
        <Text
          style={{
            marginTop: "10pt",
            fontFamily: "Helvetica-Bold",
          }}
        >
          DATES OF WITNESS{" "}
          <Text style={{ textDecoration: "underline" }}>NON-AVAILABILITY:</Text>
        </Text>
        <Text style={{ minHeight: "40pt" }}></Text>
      </View>
      <View
        style={{
          borderWidth: "1px",
          borderColor: "black",
          borderTopWidth: "0px",
          width: "100%",
          paddingTop: "10pt",
          paddingBottom: "6pt",
          paddingHorizontal: "6pt",
          fontSize: "10pt",
        }}
      >
        <Text
          style={{
            textDecoration: "underline",
            marginBottom: "10pt",
            fontFamily: "Helvetica-Bold",
          }}
        >
          Witness Consent (for witness completion)
        </Text>
        <WitnessCareItem value="Yes">
          a) The Victim Personal Statement scheme (victims only) has been
          explained to me
        </WitnessCareItem>
        <WitnessCareItem value="Yes">
          b) I have been given the Victim Personal Statement leaflet
        </WitnessCareItem>

        <WitnessCareItem value="Yes">
          c) I have been given the leaflet "Giving a witness statement to the
          police…"
        </WitnessCareItem>

        <WitnessCareItem value="Yes">
          d) I consent to police having access to my medical record(s) in
          relation to this matter (obtained in accordance with local practice)
        </WitnessCareItem>

        <WitnessCareItem value="Yes">
          e) I consent to my medical record in relation to this matter being
          disclosed to the defence
        </WitnessCareItem>

        <WitnessCareItem value="Yes">
          f) I consent to the statement being disclosed for the purposes of
          civil, or other proceedings if applicable, e.g. child care
          proceedings, CICA
        </WitnessCareItem>

        <WitnessCareItem value="Yes">
          g) Child witness cases only. I have had the provision regarding
          reporting restrictions explained to me. I would like CPS to apply for
          reporting restrictions on my behalf.
        </WitnessCareItem>

        <Text
          style={{ fontFamily: "Helvetica-Oblique", marginVertical: "15pt" }}
        >
          'I understand that the information recorded above will be passed on to
          the Witness Service, which offers help and support to witnesses
          pre-trial and at court'.
        </Text>
        <Signature label="Signature of witness" />
        <Signature label="Signature of parent/guardian/appropriate adult" />
        <Text>
          Address and telephone number (of parent etc.), if different from
          above:
        </Text>
      </View>
      <View style={{ marginTop: "24pt", marginBottom: "10pt" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Text style={{ width: "50%" }}>Statement taken by:</Text>
          <Text style={{ width: "50%" }}>Station:</Text>
        </View>
        <Text style={{ marginTop: "4pt" }}>
          Time and place statement taken:
        </Text>
      </View>
      <Header showPattern showYear />
    </Page> */}
  </Document>
);
