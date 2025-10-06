// Arduino Adventure - Level Data Configuration
// All 21 levels with complete information

const LEVEL_DATA = {
    0: {
        title: "Getting Started",
        icon: "fas fa-rocket",
        theme: "Meet Rubi, learn about your Arduino & Shield",
        estimatedTime: "10 min",
        story: "🚀 Welcome to Arduino Adventure! You're about to embark on an amazing journey where you'll learn to control lights, create sounds, and build incredible projects! Meet Rubi the Robot, your friendly AI companion who will guide you through every step. In this first mission, you'll become familiar with your Arduino UNO R4 Minima WiFi and the SmartFlex Shield - two amazing pieces of technology that will help you bring your creative ideas to life!",
        rubiIntro: "Hey there, future inventor! 🤖 I'm Rubi, and I'm absolutely thrilled to be your guide on this incredible Arduino adventure! Think of me as your personal coding coach and electronics buddy. Together, we're going to explore the fascinating world where creativity meets technology. Are you ready to discover what makes your Arduino so special?",
        hint: "🌟 Remember: Every great inventor started exactly where you are now! Don't worry if anything seems new or confusing - that's completely normal and part of the fun! I'll be right here with you every step of the way, cheering you on and helping you understand everything. Take your time, ask questions, and most importantly, enjoy this amazing journey!",
        steps: [
            {
                title: "🔍 Meet Your Arduino UNO R4 Minima WiFi",
                description: "Look at this amazing little board in your hands! 🎯\n\n**What is an Arduino?**\nThink of your Arduino as a super-smart friend that can:\n• 💡 Control lights (make them blink, change colors, or create patterns)\n• 🔊 Make sounds and music\n• 👁️ Read information from sensors (like temperature, light, or movement)\n• 🧠 Make decisions based on what it senses\n• 📡 Even connect to the internet!\n\n**Cool Facts About Your Arduino:**\n• It's like a tiny computer, but designed specifically for controlling things in the real world\n• It has a brain (microprocessor) that can run your programs\n• It never gets tired and can run your programs 24/7\n• Millions of people worldwide use Arduino to create amazing projects!\n\n**What makes the R4 special?**\n• It has built-in WiFi (so it can connect to the internet!)\n• It's faster and more powerful than older Arduino boards\n• It has more memory to store bigger programs\n\n🎯 **Your Mission:** Take a moment to really look at your Arduino. Notice the small components, the metal pins, and the USB connector. This little board is about to become your creative partner!",
                image: "/assets/images/level-0/arduino-intro.png",
                interactiveElements: [
                    {
                        type: "highlight",
                        target: "usb-connector",
                        label: "USB Connector - This is how your Arduino talks to your computer!"
                    },
                    {
                        type: "highlight",
                        target: "power-led",
                        label: "Power LED - This lights up when your Arduino is powered on"
                    },
                    {
                        type: "highlight",
                        target: "digital-pins",
                        label: "Digital Pins - These can control LEDs, read buttons, and more!"
                    },
                    {
                        type: "highlight",
                        target: "analog-pins",
                        label: "Analog Pins - These can read sensors like temperature or light"
                    }
                ],
                funFacts: [
                    "🌍 Arduino was invented in Italy in 2005",
                    "🚀 Arduino boards have been used in space missions!",
                    "🎨 Artists use Arduino to create interactive art installations",
                    "🏠 Arduino is the brain behind many smart home devices"
                ]
            },
            {
                title: "✨ Discover the SmartFlex Shield",
                description: "Now let's explore your SmartFlex Shield - this is where the magic happens! 🎪\n\n**What is a Shield?**\nA shield is like a super-powered backpack for your Arduino! Instead of having to wire up individual components (which can be tricky), the SmartFlex Shield has everything built right in and ready to use.\n\n**🎛️ Amazing Components on Your SmartFlex Shield:**\n\n**LEDs (Light Emitting Diodes):**\n• 🔴 Red LED - Perfect for alerts or creating cool effects\n• 🟢 Green LED - Great for showing when something is working\n• 🔵 Blue LED - Beautiful for decorative lighting\n• 🌈 RGB LED - This magical LED can create ANY color by mixing red, green, and blue!\n\n**Input Controls:**\n• 🔘 Push Buttons - Let you interact with your projects\n• 🎛️ Potentiometer (Knob) - Gives you smooth control, like a volume dial\n• 🕹️ Joystick - Control movement in any direction\n• 👆 Touch Sensor - Responds to your finger without pressing!\n\n**Sensors:**\n• 🌡️ Temperature Sensor - Tells you how hot or cold it is\n• ☀️ Light Sensor (LDR) - Knows when it's bright or dark\n• 📏 Ultrasonic Sensor - Measures distance like a robot's eyes\n\n**Sound Makers:**\n• 🔊 Buzzer - Can make beeps, tones, and even simple melodies\n• 🎵 Advanced sound capabilities for music projects\n\n**Displays:**\n• 🔢 7-Segment Display - Shows numbers like a digital clock\n• Various indicator LEDs\n\n🎯 **Your Mission:** Look at your SmartFlex Shield and try to identify some of these components. Don't worry about remembering everything - we'll explore each one in detail as we progress through the levels!",
                image: "/assets/images/level-0/shield-intro.png",
                interactiveElements: [
                    {
                        type: "hover",
                        target: "rgb-led",
                        label: "RGB LED - Can make over 16 million different colors!"
                    },
                    {
                        type: "hover",
                        target: "joystick",
                        label: "Joystick - Control movement in games and projects"
                    },
                    {
                        type: "hover",
                        target: "temperature-sensor",
                        label: "Temperature Sensor - Measures heat like a digital thermometer"
                    },
                    {
                        type: "hover",
                        target: "buzzer",
                        label: "Buzzer - Your Arduino's voice!"
                    }
                ],
                projectIdeas: [
                    "🎮 Build your own video game controller",
                    "🏠 Create a smart home automation system",
                    "🌡️ Make a weather station",
                    "🎵 Design a musical instrument",
                    "🚨 Build a security alarm system"
                ]
            },
            {
                title: "🔧 Connect Everything Together",
                description: "Time for the most important step - connecting your Arduino and SmartFlex Shield! 🔗\n\n**Why do we need to connect them?**\nYour Arduino is the brain, and the SmartFlex Shield is like the body with all the sensors and outputs. When we connect them properly, they work together as one powerful system!\n\n**🎯 Step-by-Step Connection Guide:**\n\n**Step 1: Prepare Your Workspace**\n• Find a clean, well-lit area to work\n• Make sure your hands are clean and dry\n• Have both the Arduino and Shield ready\n\n**Step 2: Understand the Pin System**\n• Look at the black plastic strips with holes on your Arduino - these are called 'headers'\n• The Shield has matching pins that fit perfectly into these holes\n• It's like a puzzle - there's only one correct way they fit together!\n\n**Step 3: Align Carefully**\n• Hold the Shield above the Arduino\n• Look for the labels that match (like 'GND', '5V', 'A0', etc.)\n• The Shield should sit flat on top of the Arduino\n\n**Step 4: Connect Gently**\n• Start by aligning one corner\n• Gently press down - the pins should slide smoothly into the holes\n• If it feels hard to push, stop and check the alignment\n• Work your way around until all pins are connected\n\n**Step 5: Final Check**\n• The Shield should sit completely flat on the Arduino\n• No pins should be bent or sticking out sideways\n• You should still be able to see the Arduino underneath\n\n**⚠️ Important Safety Tips:**\n• Never force the connection - if it doesn't fit easily, realign\n• Handle the boards by their edges, not by components\n• Static electricity can damage electronics, so touch a metal object first to discharge\n\n**🎉 Success Indicators:**\n• The Shield sits flat and stable\n• All pins are fully inserted\n• No components are being pressed or bent\n• The USB connector on Arduino is still accessible\n\n🎯 **Your Mission:** Take your time and connect the Shield to your Arduino. Don't rush - this is an important skill that you'll use in many future projects!",
                image: "/assets/images/level-0/assembly.png",
                troubleshooting: [
                    {
                        problem: "The Shield doesn't fit easily",
                        solution: "Don't force it! Check that all pins are aligned with their holes. Sometimes one corner needs to be adjusted."
                    },
                    {
                        problem: "One corner is higher than others",
                        solution: "That corner probably isn't connected properly. Gently lift and realign that section."
                    },
                    {
                        problem: "I can't see the Arduino labels anymore",
                        solution: "That's normal! The Shield covers most of the Arduino, but the important connectors should still be accessible."
                    }
                ],
                safetyTips: [
                    "🔌 Always disconnect power before connecting or disconnecting components",
                    "👐 Handle boards by their edges to avoid touching sensitive components",
                    "⚡ Touch a grounded metal object before handling electronics to discharge static",
                    "👀 Take your time and double-check connections"
                ],
                nextSteps: "Once connected, your Arduino and SmartFlex Shield become a powerful team ready to bring your ideas to life!"
            },
            {
                title: "🎉 Congratulations - You're Ready to Create!",
                description: "Amazing work, future inventor! 🌟 You've just completed your first step into the incredible world of Arduino programming and electronics!\n\n**🏆 What You've Accomplished:**\n• Met your Arduino UNO R4 Minima WiFi and learned what makes it special\n• Discovered all the amazing components on your SmartFlex Shield\n• Successfully connected them together into one powerful system\n• Learned important safety and handling techniques\n\n**🧠 What You've Learned:**\n• Arduino is like a tiny computer designed to interact with the real world\n• Shields make it easy to use many components without complex wiring\n• Proper connections are crucial for everything to work correctly\n• Taking time and being careful leads to better results\n\n**🚀 What's Coming Next:**\nIn your next mission, you'll write your very first program and make an LED blink! This might seem simple, but it's actually the foundation of all programming - just like learning your ABCs before writing stories.\n\n**🎯 Pro Tips for Future Adventures:**\n• Always read instructions carefully\n• Don't be afraid to experiment and try new things\n• Every mistake is a learning opportunity\n• The Arduino community is friendly and helpful\n• Most importantly - have fun and let your creativity flow!\n\n**🤖 Rubi's Encouragement:**\n\"I'm so proud of how carefully and thoughtfully you approached this first challenge! You showed patience, attention to detail, and genuine curiosity - all the qualities of a great inventor. The way you handled your Arduino and Shield tells me you're going to create some truly amazing projects. I can't wait to see what we'll build together!\"\n\n🎊 **Ready for Your First Badge?**\nYou've earned the **Explorer Badge** - wear it with pride! This badge represents the first step of your journey from curious beginner to confident creator.",
                image: "/assets/images/level-0/success.png",
                celebration: {
                    message: "🎉 Level Complete! You're now officially an Arduino Explorer! 🎉",
                    achievements: [
                        "📚 Learned about Arduino basics",
                        "🔧 Successfully connected hardware",
                        "🛡️ Practiced safe handling techniques",
                        "🎯 Completed first hands-on challenge"
                    ]
                },
                reflection: {
                    questions: [
                        "What was the most interesting thing you learned about Arduino?",
                        "Which component on the SmartFlex Shield are you most excited to use?",
                        "What kind of project would you like to build?"
                    ]
                }
            }
        ],
        badge: {
            id: "explorer",
            name: "Explorer Badge",
            icon: "fas fa-compass",
            description: "You've started your Arduino journey!"
        }
    },
    1: {
        id: 1,
        title: "Hello Arduino!",
        icon: "fas fa-lightbulb",
        theme: "LED Blinking Basics",
        estimatedTime: "12 min",
        story: "Learn to control your first LED and make it blink!",
        hint: "LEDs only work in one direction - like a one-way street for electricity.",
        steps: [
            {
                title: "Find the LED",
                description: "Locate the **red LED** on your SmartFlex Shield. It's a small round component that will light up when we program it.",
                image: "/assets/images/level-1/find-led.png",
                tip: "The LED is usually labeled 'LED1' or marked with a red dot."
            },
            {
                title: "Open Block Editor",
                description: "Click the **Block Editor** button to start programming with visual blocks.",
                image: "/assets/images/level-1/block-editor.png",
                tip: "Blocks are like puzzle pieces that snap together to create programs."
            },
            {
                title: "Find LED Blocks",
                description: "In the block palette, find the **'Turn LED ON'** and **'Turn LED OFF'** blocks.",
                image: "/assets/images/level-1/led-blocks.png",
                tip: "Look for blocks with LED icons - they're usually in the 'Outputs' category."
            },
            {
                title: "Turn LED On",
                description: "Drag the **'Turn LED ON'** block to your workspace. Set it to control the **Red LED**.",
                image: "/assets/images/level-1/led-on-block.png",
                challenge: "What do you think will happen when this block runs?"
            },
            {
                title: "Add Wait Time",
                description: "Add a **'Wait'** block after the LED ON block. Set it to **1 second**.",
                image: "/assets/images/level-1/wait-block.png",
                tip: "Without wait time, the LED would turn on and off too fast to see!"
            },
            {
                title: "Turn LED Off",
                description: "Add a **'Turn LED OFF'** block, then another **'Wait 1 second'** block.",
                image: "/assets/images/level-1/led-off-block.png",
                tip: "Now you have: ON → Wait → OFF → Wait"
            },
            {
                title: "Add Forever Loop",
                description: "Wrap all your blocks inside a **'Forever'** loop to make the LED blink continuously.",
                image: "/assets/images/level-1/forever-loop.png",
                didYouKnow: ["Loops are one of the most important programming concepts - they save you from repeating code!"]
            },
            {
                title: "Upload and Test",
                description: "Click **Upload** to send your program to the Arduino. Watch your LED blink!",
                image: "/assets/images/level-1/upload-success.png",
                challenge: "Try changing the wait time to 0.5 seconds. What happens?"
            }
        ],
        badge: {
            id: "light-beginner",
            name: "Light Beginner",
            icon: "fas fa-lightbulb",
            description: "You made your first LED blink!"
        }
    },
    2: {
        id: 2,
        title: "Beep Beep",
        icon: "fas fa-volume-up",
        theme: "Sound & Buzzer Control",
        estimatedTime: "10 min",
        story: "Add sound to your Arduino projects! Learn to make beeps, tones, and simple melodies.",
        hint: "Higher numbers = higher pitch sounds. 1000 Hz is a good middle tone to start with.",
        steps: [
            {
                title: "Find the Buzzer",
                description: "Locate the **buzzer** on your SmartFlex Shield. It's the small round component that makes sounds.",
                image: "/assets/images/level-2/find-buzzer.png",
                tip: "The buzzer is usually black or blue and has a small hole in the center."
            },
            {
                title: "Make Your First Beep",
                description: "Use the **'Play Tone'** block. Set frequency to **1000 Hz** for **1 second**.",
                image: "/assets/images/level-2/first-beep.png",
                challenge: "What do you think Hz means?"
            },
            {
                title: "Try Different Pitches",
                description: "Change the frequency. Try **500 Hz** (low), **1500 Hz** (medium), **2000 Hz** (high).",
                image: "/assets/images/level-2/different-pitches.png",
                didYouKnow: ["A piano's middle C is about 262 Hz"]
            },
            {
                title: "Control Duration",
                description: "Change the duration to make **short beeps (0.2s)** and **long beeps (2s)**.",
                image: "/assets/images/level-2/duration-control.png",
                tip: "Short beeps are good for alerts, long tones for alarms."
            },
            {
                title: "Create a Pattern",
                description: "Make a sequence: **High beep → Wait → Low beep → Wait**. Add a Forever loop.",
                image: "/assets/images/level-2/beep-pattern.png",
                challenge: "Can you make it sound like a police siren?"
            },
            {
                title: "Make Musical Notes",
                description: "Try musical frequencies: **C=262**, **D=294**, **E=330**, **F=349** Hz.",
                image: "/assets/images/level-2/musical-notes.png",
                tip: "You just created your first Arduino musical instrument!"
            }
        ],
        badge: {
            id: "sound-scout",
            name: "Sound Scout",
            icon: "fas fa-volume-up",
            description: "You mastered the art of Arduino sounds!"
        }
    },
    3: {
        id: 3,
        title: "Colorful Disco",
        icon: "fas fa-palette",
        theme: "RGB Colors & Light Shows",
        estimatedTime: "15 min",
        story: "The disco lights are broken! Create an amazing RGB light show to get the party started.",
        hint: "RGB means Red, Green, Blue. Mix them like paint: Red+Green=Yellow, Red+Blue=Purple, Green+Blue=Cyan.",
        steps: [
            {
                title: "Find the RGB LED",
                description: "Locate the **RGB LED** on your SmartFlex Shield. It can show millions of colors!",
                image: "/assets/images/level-3/find-rgb-led.png",
                tip: "RGB LEDs have 4 pins: Red, Green, Blue, and Ground (common)."
            },
            {
                title: "Learn RGB Numbers",
                description: "RGB uses numbers **0-255** for each color. **0** = OFF, **255** = Maximum brightness.",
                image: "/assets/images/level-3/rgb-numbers.png",
                didYouKnow: ["Your computer screen uses the same RGB system!"]
            },
            {
                title: "Make Red Light",
                description: "Use RGB block: Set **Red=255, Green=0, Blue=0** to make bright red.",
                image: "/assets/images/level-3/red-light.png",
                challenge: "What color do you think (255,0,0) will make?"
            },
            {
                title: "Make Green Light",
                description: "Change to **Red=0, Green=255, Blue=0** to make bright green.",
                image: "/assets/images/level-3/green-light.png",
                tip: "Green appears brightest to human eyes."
            },
            {
                title: "Make Blue Light",
                description: "Change to **Red=0, Green=0, Blue=255** to make bright blue.",
                image: "/assets/images/level-3/blue-light.png",
                tip: "Blue light has the shortest wavelength of visible light."
            },
            {
                title: "Mix Colors - Yellow",
                description: "Set **Red=255, Green=255, Blue=0**. Red + Green makes Yellow!",
                image: "/assets/images/level-3/yellow-mix.png",
                challenge: "Why does Red + Green make Yellow instead of brown?"
            },
            {
                title: "Mix Colors - Purple",
                description: "Set **Red=255, Green=0, Blue=255**. Red + Blue makes Purple/Magenta!",
                image: "/assets/images/level-3/purple-mix.png",
                tip: "Purple was historically the most expensive dye color."
            },
            {
                title: "Mix Colors - Cyan",
                description: "Set **Red=0, Green=255, Blue=255**. Green + Blue makes Cyan (light blue)!",
                image: "/assets/images/level-3/cyan-mix.png",
                didYouKnow: ["Cyan is used in color printing along with Magenta and Yellow."]
            },
            {
                title: "Create Color Sequence",
                description: "Add **Wait** blocks between each color to create a smooth color-changing sequence.",
                image: "/assets/images/level-3/color-sequence.png",
                tip: "Use 500ms waits - not too fast, not too slow."
            },
            {
                title: "Add Forever Loop",
                description: "Wrap everything in a **Forever** loop to create a continuous disco light show!",
                image: "/assets/images/level-3/disco-loop.png",
                challenge: "Try different wait times. What looks best for a disco?"
            }
        ],
        badge: {
            id: "disco-maker",
            name: "Disco Maker",
            icon: "fas fa-palette",
            description: "You created an amazing light show and saved the royal robot disco!"
        }
    },
    4: {
        title: "Repeat It",
        icon: "fas fa-sync",
        theme: "Loops & repetition",
        estimatedTime: "15 min",
        story: "Copying and pasting the same blocks over and over is boring! Smart programmers use loops to repeat actions. It's like teaching your Arduino to do the same dance move over and over without getting tired!",
        rubiIntro: "Let's learn the magic of loops - they'll make your programs shorter and more powerful!",
        hint: "A loop is like saying 'do this 10 times' instead of writing the same thing 10 times!",
        steps: [
            {
                title: "See the Problem",
                description: "Look at this long program that repeats the same pattern many times - there's a better way!",
                image: "/assets/images/level-4/long-program.png"
            },
            {
                title: "Use a Forever Loop",
                description: "Replace all those repeated blocks with a 'forever' loop that runs continuously.",
                image: "/assets/images/level-4/forever-loop.png"
            },
            {
                title: "Try a Repeat Loop",
                description: "Use a 'repeat 10 times' loop for precise control over how many times something happens.",
                image: "/assets/images/level-4/repeat-loop.png"
            }
        ],
        badge: {
            id: "code-wizard",
            name: "Code Wizard",
            icon: "fas fa-magic",
            description: "You mastered the power of loops!"
        }
    },
    5: {
        title: "Push It",
        icon: "fas fa-hand-pointer",
        theme: "Inputs & conditionals",
        estimatedTime: "16 min",
        story: "So far your Arduino has been doing its own thing, but what if you want to control it? Buttons are inputs that let you tell your Arduino what to do. Press a button and make something happen - it's interactive!",
        rubiIntro: "Time to take control! Let's learn how buttons can make your Arduino respond to your commands.",
        hint: "When a button is pressed, it sends a signal - use 'if' blocks to check when this happens!",
        steps: [
            {
                title: "Find Your Button",
                description: "Locate the push button on your SmartFlex Shield - it's the small clickable component.",
                image: "/assets/images/level-5/find-button.png"
            },
            {
                title: "Read Button State",
                description: "Use the 'button is pressed' block to check if someone is pushing the button.",
                image: "/assets/images/level-5/read-button.png"
            },
            {
                title: "Add Button Control",
                description: "Use an 'if' block to turn on an LED only when the button is pressed.",
                image: "/assets/images/level-5/button-control.png"
            },
            {
                title: "Make It Interactive",
                description: "Try different actions - maybe a different color LED or a sound when the button is pressed!",
                image: "/assets/images/level-5/interactive.png"
            }
        ],
        badge: {
            id: "button-master",
            name: "Button Master",
            icon: "fas fa-hand-pointer",
            description: "You learned to control with buttons!"
        }
    },
    6: {
        title: "Piano",
        icon: "fas fa-music",
        theme: "Buzzer + button combinations",
        estimatedTime: "20 min",
        story: "Every great inventor needs to be a bit of a musician too! Your SmartFlex Shield has multiple buttons that can act like piano keys. Each button will play a different musical note. Time to compose your first Arduino symphony!",
        rubiIntro: "Let's turn your Arduino into a musical instrument! Each button will be a different piano key.",
        hint: "Different frequencies make different musical notes - C is 262 Hz, D is 294 Hz, E is 330 Hz!",
        steps: [
            {
                title: "Plan Your Piano",
                description: "Each button on your shield will play a different musical note when pressed.",
                image: "/assets/images/level-6/piano-plan.png"
            },
            {
                title: "First Piano Key",
                description: "Program one button to play middle C (262 Hz) when pressed.",
                image: "/assets/images/level-6/first-key.png"
            },
            {
                title: "Add More Notes",
                description: "Add D (294 Hz), E (330 Hz), and F (349 Hz) to different buttons.",
                image: "/assets/images/level-6/more-notes.png"
            },
            {
                title: "Play a Simple Song",
                description: "Try playing 'Mary Had a Little Lamb' or create your own tune!",
                image: "/assets/images/level-6/play-song.png"
            }
        ],
        badge: {
            id: "musician",
            name: "Musician",
            icon: "fas fa-music",
            description: "You created your own Arduino piano!"
        }
    },
    7: {
        title: "Knob",
        icon: "fas fa-sliders-h",
        theme: "Analog inputs",
        estimatedTime: "17 min",
        story: "Buttons are either on or off, but what about controls that can be somewhere in between? The potentiometer (knob) on your SmartFlex Shield can be turned to any position, giving you smooth control over your Arduino creations!",
        rubiIntro: "Time to get smooth control! This knob can give us any value between 0 and 1023.",
        hint: "Analog inputs give us numbers instead of just true/false - perfect for controlling brightness or volume!",
        steps: [
            {
                title: "Meet the Potentiometer",
                description: "Find the rotary knob on your shield - this is called a potentiometer or 'pot' for short.",
                image: "/assets/images/level-7/find-pot.png"
            },
            {
                title: "Read the Knob Value",
                description: "Use an analog input block to read the knob's position (0-1023).",
                image: "/assets/images/level-7/read-value.png"
            },
            {
                title: "Control LED Brightness",
                description: "Use the knob value to control how bright an LED glows!",
                image: "/assets/images/level-7/control-brightness.png"
            }
        ],
        badge: {
            id: "control-captain",
            name: "Control Captain",
            icon: "fas fa-sliders-h",
            description: "You mastered analog input controls!"
        }
    },
    8: {
        title: "Control the Lights",
        icon: "fas fa-adjust",
        theme: "PWM basics",
        estimatedTime: "19 min",
        story: "Your LED is either fully on or completely off - but what if you want it somewhere in between? PWM (Pulse Width Modulation) is like rapidly blinking an LED so fast that it appears dimmed. It's like a digital dimmer switch!",
        rubiIntro: "Let's learn how to make LEDs glow at any brightness level using PWM magic!",
        hint: "PWM values go from 0 (completely off) to 255 (fully bright) - try different values!",
        steps: [
            {
                title: "Understanding PWM",
                description: "PWM rapidly turns an LED on and off so fast it looks like it's dimmed.",
                image: "/assets/images/level-8/pwm-explanation.png"
            },
            {
                title: "Set LED Brightness",
                description: "Use PWM blocks to set an LED to half brightness (128).",
                image: "/assets/images/level-8/half-brightness.png"
            },
            {
                title: "Create a Breathing Effect",
                description: "Gradually increase and decrease the brightness to make the LED 'breathe'.",
                image: "/assets/images/level-8/breathing-led.png"
            }
        ],
        badge: {
            id: "light-engineer",
            name: "Light Engineer",
            icon: "fas fa-adjust",
            description: "You learned to control light intensity!"
        }
    },
    9: {
        title: "Control the Temperature",
        icon: "fas fa-thermometer-half",
        theme: "Sensors & reactions",
        estimatedTime: "16 min",
        story: "Your SmartFlex Shield can sense the world around it! The temperature sensor can tell if it's hot or cold, and you can make your Arduino react accordingly. Create a temperature alarm or a weather station!",
        rubiIntro: "Let's make your Arduino smart enough to sense temperature and react to it!",
        hint: "Temperature sensors give you numbers - use 'if' blocks to react when it's too hot or too cold!",
        steps: [
            {
                title: "Find the Temperature Sensor",
                description: "Locate the temperature sensor on your SmartFlex Shield - it looks like a small black component.",
                image: "/assets/images/level-9/find-sensor.png"
            },
            {
                title: "Read Temperature",
                description: "Use the temperature sensor block to read the current temperature.",
                image: "/assets/images/level-9/read-temp.png"
            },
            {
                title: "React to Temperature",
                description: "Make a blue LED turn on when it's cold and a red LED when it's warm!",
                image: "/assets/images/level-9/temp-reactions.png"
            }
        ],
        badge: {
            id: "weather-watcher",
            name: "Weather Watcher",
            icon: "fas fa-cloud-sun",
            description: "You created a temperature-reactive system!"
        }
    },
    10: {
        title: "Display Numbers",
        icon: "fas fa-digital-tachograph",
        theme: "7-segment display",
        estimatedTime: "18 min",
        story: "Numbers are everywhere in electronics! Your SmartFlex Shield has a 7-segment display that can show any digit from 0-9. It's like having a digital clock display that you can control. Let's make a digital counter!",
        rubiIntro: "Time to display some numbers! This 7-segment display will show any digit you want.",
        hint: "Each segment of the display can be turned on or off to form different numbers!",
        steps: [
            {
                title: "Understanding 7-Segment",
                description: "A 7-segment display has 7 LED segments that combine to show any digit 0-9.",
                image: "/assets/images/level-10/7seg-explanation.png"
            },
            {
                title: "Display Your First Number",
                description: "Use the display block to show the number 5 on your 7-segment display.",
                image: "/assets/images/level-10/show-number.png"
            },
            {
                title: "Create a Counter",
                description: "Make numbers count from 0 to 9 and then repeat!",
                image: "/assets/images/level-10/counter.png"
            }
        ],
        badge: {
            id: "number-genius",
            name: "Number Genius",
            icon: "fas fa-calculator",
            description: "You mastered digital number displays!"
        }
    },
    11: {
        title: "Let's Count",
        icon: "fas fa-plus-circle",
        theme: "Rotary encoder",
        estimatedTime: "20 min",
        story: "Sometimes you need to count things that spin! The rotary encoder on your SmartFlex Shield can detect rotation in either direction. Turn it clockwise to count up, counterclockwise to count down. It's like a digital volume knob!",
        rubiIntro: "This special knob can count how much you turn it - perfect for making counters and controls!",
        hint: "Rotary encoders can count up or down depending on which direction you turn them!",
        steps: [
            {
                title: "Meet the Rotary Encoder",
                description: "Find the rotary encoder - it looks like a knob but can also be pressed like a button!",
                image: "/assets/images/level-11/find-encoder.png"
            },
            {
                title: "Count Rotations",
                description: "Use encoder blocks to count how many times the knob is turned.",
                image: "/assets/images/level-11/count-turns.png"
            },
            {
                title: "Display the Count",
                description: "Show the count on your 7-segment display or control LED brightness with it!",
                image: "/assets/images/level-11/show-count.png"
            }
        ],
        badge: {
            id: "counter-pro",
            name: "Counter Pro",
            icon: "fas fa-plus-circle",
            description: "You became an expert at counting!"
        }
    },
    12: {
        title: "Simon Says",
        icon: "fas fa-gamepad",
        theme: "Memory & logic",
        estimatedTime: "25 min",
        story: "Time to create your own memory game! Simon Says is a classic game where you have to remember and repeat a sequence of lights and sounds. Your Arduino will create random patterns, and you have to copy them perfectly!",
        rubiIntro: "Let's build the classic Simon Says memory game! Can you remember the sequence?",
        hint: "Use arrays to store the sequence and loops to play it back and check the player's input!",
        steps: [
            {
                title: "Plan the Game",
                description: "Simon Says shows a sequence of lights/sounds that players must repeat in order.",
                image: "/assets/images/level-12/game-plan.png"
            },
            {
                title: "Create Light Patterns",
                description: "Program different colored LEDs to light up in a sequence.",
                image: "/assets/images/level-12/light-sequence.png"
            },
            {
                title: "Add Player Input",
                description: "Use buttons to let players input their guesses.",
                image: "/assets/images/level-12/player-input.png"
            },
            {
                title: "Check Answers",
                description: "Compare the player's input with the correct sequence!",
                image: "/assets/images/level-12/check-answer.png"
            }
        ],
        badge: {
            id: "game-coder",
            name: "Game Coder",
            icon: "fas fa-gamepad",
            description: "You built your own memory game!"
        }
    },
    13: {
        title: "Jump / Catch the Thief",
        icon: "fas fa-hand-paper",
        theme: "Touch sensor",
        estimatedTime: "17 min",
        story: "A sneaky thief is trying to escape! Use the touch sensor on your SmartFlex Shield to catch them. When you touch the sensor at just the right moment, you'll catch the thief and save the day!",
        rubiIntro: "Quick! Use your touch sensing skills to catch the escaping thief!",
        hint: "Touch sensors can detect when your finger gets close - they're like magic buttons!",
        steps: [
            {
                title: "Find the Touch Sensor",
                description: "Locate the capacitive touch sensor on your shield - it detects touch without pressing!",
                image: "/assets/images/level-13/find-touch.png"
            },
            {
                title: "Detect Touch",
                description: "Use touch sensor blocks to detect when someone touches the sensor.",
                image: "/assets/images/level-13/detect-touch.png"
            },
            {
                title: "Create the Game",
                description: "Make LEDs move across the display - touch at the right time to catch the thief!",
                image: "/assets/images/level-13/catch-game.png"
            }
        ],
        badge: {
            id: "detective",
            name: "Detective",
            icon: "fas fa-search",
            description: "You caught the thief with touch control!"
        }
    },
    14: {
        title: "Become an Artist",
        icon: "fas fa-paint-brush",
        theme: "Joystick drawing",
        estimatedTime: "22 min",
        story: "Every great inventor is also an artist! Your SmartFlex Shield has a joystick that can control movement in any direction. Create digital art by controlling LEDs with joystick movements, or build a simple drawing game!",
        rubiIntro: "Let's turn you into a digital artist! Use the joystick to create amazing LED art.",
        hint: "Joysticks give you X and Y coordinates - perfect for controlling position and movement!",
        steps: [
            {
                title: "Explore the Joystick",
                description: "Find the analog joystick - it can move in any direction and also clicks like a button!",
                image: "/assets/images/level-14/find-joystick.png"
            },
            {
                title: "Read X and Y Values",
                description: "Use joystick blocks to read horizontal (X) and vertical (Y) movements.",
                image: "/assets/images/level-14/read-xy.png"
            },
            {
                title: "Control LED Matrix",
                description: "Use joystick movements to control which LED lights up - like digital finger painting!",
                image: "/assets/images/level-14/led-art.png"
            }
        ],
        badge: {
            id: "creative-coder",
            name: "Creative Coder",
            icon: "fas fa-paint-brush",
            description: "You created art with code!"
        }
    },
    15: {
        title: "Video Game",
        icon: "fas fa-trophy",
        theme: "Movement & collision",
        estimatedTime: "30 min",
        story: "Time to build your very own video game! Combine everything you've learned - joystick controls, LED displays, buttons, and sound effects. Create a simple game where players move around and avoid obstacles!",
        rubiIntro: "This is it - your final coding challenge! Let's build an amazing video game together!",
        hint: "Games need player input, moving objects, collision detection, and scoring - you can do this!",
        steps: [
            {
                title: "Design Your Game",
                description: "Plan a simple game with a player character, obstacles, and a goal.",
                image: "/assets/images/level-15/game-design.png"
            },
            {
                title: "Player Movement",
                description: "Use the joystick to control a player character (represented by an LED).",
                image: "/assets/images/level-15/player-control.png"
            },
            {
                title: "Add Obstacles",
                description: "Create moving obstacles that the player must avoid.",
                image: "/assets/images/level-15/obstacles.png"
            },
            {
                title: "Collision Detection",
                description: "Check when the player touches an obstacle and end the game!",
                image: "/assets/images/level-15/collision.png"
            },
            {
                title: "Score System",
                description: "Add a score that increases the longer the player survives!",
                image: "/assets/images/level-15/scoring.png"
            }
        ],
        badge: {
            id: "game-designer",
            name: "Game Designer",
            icon: "fas fa-trophy",
            description: "You built your own video game!"
        }
    },
    16: {
        title: "Smart Home",
        icon: "fas fa-home",
        theme: "LDR sensor",
        estimatedTime: "18 min",
        story: "Welcome to the future! Create a smart home system that automatically turns lights on when it gets dark. The LDR (Light Dependent Resistor) sensor can detect how bright or dark it is, just like the sensors in automatic streetlights!",
        rubiIntro: "Let's make your home smarter! This light sensor will automate your lighting system.",
        hint: "LDR sensors give lower values in darkness and higher values in bright light!",
        steps: [
            {
                title: "Find the LDR Sensor",
                description: "Locate the LDR sensor - it looks like a small component with a squiggly pattern on top.",
                image: "/assets/images/level-16/find-ldr.png"
            },
            {
                title: "Read Light Levels",
                description: "Use LDR blocks to read the current light level in your room.",
                image: "/assets/images/level-16/read-light.png"
            },
            {
                title: "Automatic Lighting",
                description: "Turn on LEDs automatically when it gets dark, just like smart streetlights!",
                image: "/assets/images/level-16/auto-lights.png"
            }
        ],
        badge: {
            id: "smart-builder",
            name: "Smart Builder",
            icon: "fas fa-home",
            description: "You built a smart home system!"
        }
    },
    17: {
        title: "Greenhouse",
        icon: "fas fa-seedling",
        theme: "Combining sensors",
        estimatedTime: "25 min",
        story: "Plants need just the right conditions to grow! Build an automated greenhouse that monitors temperature and light, then automatically adjusts conditions to keep plants happy. It's like being a plant scientist and robot engineer combined!",
        rubiIntro: "Let's help plants grow by combining multiple sensors into one smart system!",
        hint: "Real systems use multiple sensors together - temperature, light, and even soil moisture!",
        steps: [
            {
                title: "Plan Your Greenhouse",
                description: "A smart greenhouse monitors multiple conditions and responds automatically.",
                image: "/assets/images/level-17/greenhouse-plan.png"
            },
            {
                title: "Monitor Temperature",
                description: "Use the temperature sensor to check if it's too hot or cold for plants.",
                image: "/assets/images/level-17/temp-monitor.png"
            },
            {
                title: "Check Light Levels",
                description: "Use the LDR to see if plants are getting enough light.",
                image: "/assets/images/level-17/light-monitor.png"
            },
            {
                title: "Automated Responses",
                description: "Turn on grow lights when dark, activate cooling when hot!",
                image: "/assets/images/level-17/auto-responses.png"
            }
        ],
        badge: {
            id: "eco-hero",
            name: "Eco Hero",
            icon: "fas fa-leaf",
            description: "You built an automated greenhouse!"
        }
    },
    18: {
        title: "Speech Recognition (AI)",
        icon: "fas fa-microphone",
        theme: "Voice commands",
        estimatedTime: "20 min",
        story: "The future is here! Your Arduino can now understand simple voice commands thanks to AI technology. Say 'turn on lights' or 'play music' and watch your Arduino obey your voice commands like a digital assistant!",
        rubiIntro: "Amazing! Now you can talk to your Arduino and it will understand you!",
        hint: "Voice recognition works best with clear, short commands - try 'on', 'off', 'red', 'blue'!",
        steps: [
            {
                title: "Setup Voice Recognition",
                description: "Connect the voice recognition module to your SmartFlex Shield.",
                image: "/assets/images/level-18/voice-setup.png"
            },
            {
                title: "Train Voice Commands",
                description: "Teach your Arduino to recognize specific words like 'on', 'off', 'red', 'blue'.",
                image: "/assets/images/level-18/train-commands.png"
            },
            {
                title: "Voice-Controlled Actions",
                description: "Program your Arduino to respond to voice commands with lights and sounds!",
                image: "/assets/images/level-18/voice-actions.png"
            }
        ],
        badge: {
            id: "ai-explorer",
            name: "AI Explorer",
            icon: "fas fa-brain",
            description: "You built a voice-controlled system!"
        }
    },
    19: {
        title: "Science Experiment",
        icon: "fas fa-flask",
        theme: "IR/Ultrasonic basics",
        estimatedTime: "22 min",
        story: "Every great inventor is also a scientist! Use infrared and ultrasonic sensors to explore invisible parts of our world. Measure distances without touching, detect movement, and discover how animals like bats navigate in the dark!",
        rubiIntro: "Time to explore the invisible world around us with amazing sensors!",
        hint: "Ultrasonic sensors work like bat sonar - they bounce sound waves off objects to measure distance!",
        steps: [
            {
                title: "Understanding Ultrasonic",
                description: "Ultrasonic sensors send sound waves and measure how long they take to bounce back.",
                image: "/assets/images/level-19/ultrasonic-explanation.png"
            },
            {
                title: "Measure Distance",
                description: "Use the ultrasonic sensor to measure how far away objects are.",
                image: "/assets/images/level-19/measure-distance.png"
            },
            {
                title: "Motion Detection",
                description: "Create a motion detector that beeps when something moves nearby!",
                image: "/assets/images/level-19/motion-detector.png"
            },
            {
                title: "IR Experiments",
                description: "Use infrared sensors to detect objects and heat signatures.",
                image: "/assets/images/level-19/ir-experiments.png"
            }
        ],
        badge: {
            id: "science-seeker",
            name: "Science Seeker",
            icon: "fas fa-flask",
            description: "You conducted amazing sensor experiments!"
        }
    },
    20: {
        title: "Theremin",
        icon: "fas fa-waveform-lines",
        theme: "Distance + Sound creativity",
        estimatedTime: "25 min",
        story: "Create the most magical musical instrument ever invented! A theremin makes music without touching it - you control the sound by moving your hands in the air. It's like conducting an invisible orchestra with science and code!",
        rubiIntro: "This is the grand finale! Let's build a magical instrument that responds to your movements!",
        hint: "Use distance sensors to control pitch and volume - closer means higher pitch, farther means lower!",
        steps: [
            {
                title: "What is a Theremin?",
                description: "A theremin is played without touching it - hand movements in the air control the music!",
                image: "/assets/images/level-20/theremin-history.png"
            },
            {
                title: "Distance to Pitch",
                description: "Use the ultrasonic sensor to convert hand distance into musical pitch.",
                image: "/assets/images/level-20/distance-pitch.png"
            },
            {
                title: "Add Volume Control",
                description: "Use a second sensor or the joystick to control how loud the sound is.",
                image: "/assets/images/level-20/volume-control.png"
            },
            {
                title: "Visual Feedback",
                description: "Add LED patterns that dance along with the music you create!",
                image: "/assets/images/level-20/visual-theremin.png"
            }
        ],
        badge: {
            id: "sound-magician",
            name: "Sound Magician",
            icon: "fas fa-magic",
            description: "You mastered the magical theremin!"
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LEVEL_DATA;
}