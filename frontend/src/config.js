export const config = {
  // -------- CUSTOMIZATION SECTION --------
  // Replace these with your own words and photos!

  // 1. Website Title
  title: "A Special Surprise For You! ❤️",

  // 2. Theme Colors
  colors: {
    primary: "#ff758f",   // Vibrant rose pink
    secondary: "#8338ec",   // Vibrant purple
    accent: "#ffb703",   // Golden yellow
    background: "#02010a",   // Deep midnight blue
    text: "#ffffff",   // White text
    heart: "#ff006e",   // Hot pink hearts
  },

  // 3. Passcode Screen
  passcode: {
    // The correct 4-digit PIN
    pin: "2430",
    // Text displayed above the keypad
    title: "Enter the passcode",
    // Error message shown when wrong
    errorMessage: "Oops! Wrong passcode 🥺",
    // The photo displayed on the left side of the screen
    photoUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&q=80",
    photoCaption: "",
  },

  // 4. Audio & Sound Effects
  // You can put your own .mp3 files in the "public" folder and link them here (e.g., "/my-song.mp3")
  sounds: {
    // Background music (loops automatically)
    backgroundMusic: "https://drive.google.com/file/d/1D5N8xxBlPAzzycgopPyz8L-VHDSOKTz8/view?usp=share_link",
    // Sound effect when a button is clicked
    click: "https://actions.google.com/sounds/v1/ui/pop_click.ogg",
    // Sound effect when a gift is opened
    unwrap: "https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg", // Placeholder
    // Sound effect for the funny trap screen
    error: "https://actions.google.com/sounds/v1/cartoon/cartoon_cowbell.ogg", // Placeholder
    // Sound effect for candle blowing
    blow: "https://actions.google.com/sounds/v1/water/air_release.ogg", // Placeholder
    // Magical chime for the final screen
    chime: "https://actions.google.com/sounds/v1/magic/magical_ping.ogg", // Placeholder
    // Swoosh sound for memory photos
    swoosh: "https://actions.google.com/sounds/v1/cartoon/whoosh_swish_high.ogg", // Placeholder
  },

  // 5. Welcome Screen
  welcome: {
    title: "A Special Surprise For You! ❤️",
    subtitle: "I made this little something just for you...",
    buttonText: "Let's Go!",
  },

  // 6. Trap Screen
  trap: {
    title: "Wait a minute...",
    message: "Are you really ready for this? 😤",
    buttonText: "I'm ready, I promise!",
  },

  // 7. Gift Selection Screen
  gifts: {
    title: "Pick a gift! 🎁",
    items: [
      {
        id: 1,
        title: "Message",
        content: "You are the sweetest person I know! Every day with you is a blessing. 💕",
        icon: "Mail",
      },
      {
        id: 2,
        title: "Memory",
        // ADD YOUR OWN PHOTO URL HERE:
        content: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&q=80",
        isImage: true,
        icon: "Camera",
      },
      {
        id: 3,
        title: "Funny",
        content: "I love you more than pizza! And you know how much I love pizza. 🍕",
        icon: "Smile",
      },
    ],
    continueButtonText: "Next Surprise",
  },

  // 8. Cake Screen
  cake: {
    title: "Make a wish! ✨",
    instruction: "Tap the candles to blow them out!",
    buttonText: "Open your eyes",
    message: "Happy Celebration!",
  },

  // 9. Celebration Collage Screen (After Cake)
  happyBirthday: {
    title: "HAPPY\nDAY",
    // You can upload your own collage background here
    backgroundImage: "",
    // The two polaroid photos
    photo1: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&q=80",
    photo2: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&q=80",
    // Snoopy holding cake illustration
    snoopyImage: "",
  },

  // 10. Memory/Photos Screen
  memories: {
    title: "I MISS US",
    subtitle: "TOGETHER",
    backgroundImage: "https://www.transparenttextures.com/patterns/stardust.png", // Fallback if no kiss pattern is provided
    // ADD YOUR OWN PHOTOS AND CAPTIONS HERE:
    photos: [
      {
        url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=500&q=80",
        caption: "Our first trip ✈️",
      },
      {
        url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&q=80",
        caption: "That funny day 😂",
      },
      {
        url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&q=80",
        caption: "Always together 💕",
      },
    ],
    buttonText: "One last thing...",
  },

  // 11. Final Message Screen
  final: {
    title: "Happy Celebration, my love! 🎉",
    message: "Thank you for being the amazing person you are. I hope this little website brought a smile to your face. Here's to many more special moments together! I love you so much! ❤️",
    replayButtonText: "Replay Experience",
  },
};
