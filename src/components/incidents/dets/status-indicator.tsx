import { mdiSync, mdiCheckCircleOutline } from "@mdi/js";
import { SlottedSVG, IcTypography } from "@ukic/react";

interface IStatusIndicatorProps {
  isSaving: boolean;
  hasPendingChanges: boolean;
}
export const StatusIndicator = ({ isSaving }: IStatusIndicatorProps) => (
  <div
    className={`absolute bottom-2 right-2 bg-ic-architectural-400 h-5 p-1 rounded-full flex items-center gap-1 text-white shadow transition-all duration-100`}
  >
    <SlottedSVG
      path={
        isSaving
          ? mdiSync
          : // : hasPendingChanges
            //   ? mdiPencil
            mdiCheckCircleOutline
      }
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`w-5 h-5 ${isSaving ? "animate-spin" : ""} [animation-direction:reverse]`}
    />
    <IcTypography variant="badge" className="text-white pr-1">
      {isSaving
        ? "Saving"
        : // hasPendingChanges ? "Editing" :
          "Saved"}
    </IcTypography>

    {/* {isSaving && (
      <>
        <SlottedSVG
          path={mdiSync}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 animate-spin [animation-direction:reverse]"
        />
        <IcTypography variant="badge" className="text-white pr-1">
          Saving
        </IcTypography>
      </>
    )} */}
    {/* {!isSaving && hasPendingChanges && (
      <>
        <SlottedSVG
          path={mdiPencil}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        />
        <IcTypography variant="badge" className="text-white pr-1">
          Editing
        </IcTypography>
      </>
    )} */}
    {/* {!isSaving && (
      <>
        <SlottedSVG
          path={mdiCheckCircleOutline}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        />
        <IcTypography
          variant="badge"
          className="text-white pr-1 delay-1000 transition-normal"
        >
          Saved
        </IcTypography>
      </> */}
  </div>
);
