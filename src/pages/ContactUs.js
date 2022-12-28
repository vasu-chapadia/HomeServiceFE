import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import ContactUsForm from "components/forms/TwoColContactUsWithIllustrationFullForm.js";
import ContactDetails from "components/cards/ThreeColContactDetails.js";

const Address = tw.span`leading-relaxed`;
const AddressLine = tw.span`block`;
const Email = tw.span`text-sm mt-6 block text-gray-500`;
const Phone = tw.span`text-sm mt-0 block text-gray-500`;

const ContactUs = () => {
  return (
    <AnimationRevealPage>
      <ContactUsForm />
      <ContactDetails
        cards={[
          {
            title: "Gujarat",
            description: (
              <>
                <Address>
                  <AddressLine>Adajan,Surat</AddressLine>
                </Address>
                <Email>contact@services.com</Email>
                <Phone>+91 8401562536</Phone>
              </>
            )
          },
          {
            title: "Mumbai",
            description: (
              <>
                <Address>
                  <AddressLine>Mumbai</AddressLine>
                </Address>
                <Email>contact@services.com</Email>
                <Phone>+91 9765562536</Phone>
              </>
            )
          }
        ]}
      />
    </AnimationRevealPage>
  );
};

export default ContactUs;
