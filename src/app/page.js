import HomePage from "@/components/HomePage/HomePage";
import { getFetchData } from "@/lib/helpers/DataFetch";
import { URL_HOME } from "@/lib/helpers/DataUrls";
import { generatePagesMetadata } from "@/lib/helpers/generatePagesMetadata";
import { useLanguageContent } from "@/lib/helpers/useLanguageContent";

// export const generateMetadata = async () => generatePagesMetadata(URL_HOME);

const preparedData = {
  "seo": {
    "documentTitle": "RTRTS TMPLATE",
    "documentKeywords": "nextjs, next.js, creative, creative development, framer-motion",
    "documentDescription": "the ideal template for creative work, featuring stunning components and fluid functionality on nextjs.",
    "documentImage": "/images/screenshot.png"
  },
  "en": {
    "hero": {
      "adress": {
        "text": "Adress we are proud of: <br /> 5 Yunitsman St., <br /> Larnaca 6936025, Cyprus",
        "href": "/"
      },
      "link": {
        "text": "Ready to find the one you’ll be proud of?",
        "href": "/"
      }
    },
    "about": {
      "top": {
        "title": "We are developing a property with a modern approach to the construction of a new housing format, with the integration of urban principles at the core and human needs at the heart.",
        "text": "Building homes, not just walls"
      },
      "bottom": {
        "list": [
          {
            "text": "3 Projects",
            "image": "/images/home/about/1.svg"
          },
          {
            "text": "150 Flats",
            "image": "/images/home/about/2.svg"
          },
          {
            "text": "5 Areas",
            "image": "/images/home/about/3.svg"
          }
        ]
      }
    },
    "projects": {
      "title": "Projects",
      "list": [
        {
          "image": "/images/home/projects/1.png",
          "title": "ASGATA VILLAGE",
          "list": [
            "104 Nahal Griva Digeni, <br /> Larnaca 6044, Cyprus",
            "Residence | Ready to move in ",
            "Area from: 150 m2 | Bedrooms from: 3 | Energy Efficiency: A",
            "Starting at €1050 000"
          ],
          "button": {
            "text": "Learn more",
            "href": "/"
          }
        }
      ],
      "button": {
        "text": "View projects",
        "href": "/",
        "length": 6
      }
    },
    "services": {
      "title": "Major services",
      "list": [
        "Agreement Support",
        "Obtaining a Residence Permit",
        "Renting out Real Estate",
        "Holding Company"
      ]
    }
  },
  "gre": {
    "hero": {
      "adress": {
        "text": "Διεύθυνση που είμαστε περήφανοι: <br /> Οδός Yunitsman 5, <br /> Λάρνακα 6936025, Κύπρος",
        "href": "/"
      },
      "link": {
        "text": "Έτοιμοι να βρείτε αυτό που θα είστε περήφανοι;",
        "href": "/"
      }
    },
    "about": {
      "top": {
        "title": "Αναπτύσσουμε ακίνητα με μια σύγχρονη προσέγγιση στην κατασκευή μιας νέας μορφής κατοικίας, με την ενσωμάτωση των αρχών της αστικής ανάπτυξης στο επίκεντρο και τις ανθρώπινες ανάγκες στην καρδιά.",
        "text": "Χτίζουμε σπίτια, όχι μόνο τοίχους"
      },
      "bottom": {
        "list": [
          {
            "text": "3 Έργα",
            "image": "/images/home/about/1.svg"
          },
          {
            "text": "150 Διαμερίσματα",
            "image": "/images/home/about/2.svg"
          },
          {
            "text": "5 Περιοχές",
            "image": "/images/home/about/3.svg"
          }
        ]
      }
    },
    "projects": {
      "title": "Έργα",
      "list": [
        {
          "image": "/images/home/projects/1.png",
          "title": "ASGATA VILLAGE",
          "list": [
            "104 Nahal Griva Digeni, <br /> Λάρνακα 6044, Κύπρος",
            "Κατοικία | Έτοιμο προς μετακόμιση",
            "Εμβαδόν από: 150 τ.μ. | Υπνοδωμάτια από: 3 | Ενεργειακή Απόδοση: A",
            "Αρχική τιμή €1050 000"
          ],
          "button": {
            "text": "Μάθετε περισσότερα",
            "href": "/"
          }
        }
      ],
      "button": {
        "text": "Δείτε τα έργα",
        "href": "/",
        "length": 6
      }
    },
    "services": {
      "title": "Κύριες υπηρεσίες",
      "list": [
        "Υποστήριξη συμφωνιών",
        "Απόκτηση άδειας διαμονής",
        "Ενοικίαση ακινήτου",
        "Διαχείριση εταιρειών"
      ]
    }
  }
}

export default async function Home() {
  // const preparedData = await getFetchData(URL_HOME);
  const data = useLanguageContent(preparedData, "en");
  
  return (
    <HomePage data={data}/>
  );
}
