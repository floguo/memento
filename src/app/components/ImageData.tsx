export interface ImageData {
    src: string;
    alt: string;
    caption?: string;
    date?: string;
  }
  
export const images: ImageData[] = [
    { 
      src: "/img/bodega_nov_17_2024.webp", 
      alt: "The homies outside Lucky's Bodega", 
      caption: "LUCKY’S BODEGA",
      date: "NOV 17, 2024"
    },
    { 
      src: "/img/film_nov_10_2024.webp", 
      alt: "Socratica Film Festival 2024", 
      caption: "SOCRATICA FILM FESTIVAL",
      date: "NOV 10, 2024"
    },
    { 
      src: "/img/honne_nov_13_2024.webp", 
      alt: "Honne onstage at their Toronto show", 
      caption: "HONNE IN TORONTO",
      date: "NOV 13, 2024"
    },
    // { 
    //   src: "/img/tyfe_nov_08_2024.webp", 
    //   alt: "Smiling Flo making a heart with her arms", 
    //   caption: "TYFE <3",
    //   date: "NOV 8, 2024"
    // },
    // { 
    //   src: "/img/actinolite_nov_08_2024.webp", 
    //   alt: "Dinner at Actinolite with Ben",
    //   caption: "ACTINOLITE - OSSINGTON",
    //   date: "NOV 8, 2024"
    // }
  ];