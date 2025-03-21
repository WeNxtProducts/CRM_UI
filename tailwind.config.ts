import { type Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const btnFontAndSize = ({ addUtilities }: { addUtilities: (utilities: Record<string, any>) => void }) => {
	const buttonColors = [
		'primary',
		'secondary',
		'destructive',
		'muted',
		'accent',
	];

	buttonColors.forEach((color) => {
		addUtilities({
			[`.text-btn-${color}`]: {
				fontSize: 'var(--btn-font-size-md)',
				color: `hsl(var(--${color}-foreground))`,
			},
		});
	});
};

const config = {
	darkMode: ['class'],
	content: ['./src/**/*.{ts,tsx}'],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				gray: {
					66: '#DEDEDE66', // translucentGray
					75: '#D8D8D8',
					90: '#E4E4E4', // Very light gray.
					100: '#FAFAFA', // white
					200: '#F8F8FA', // lightGray
					300: '#E2E8F0', // lightestGray
					350: '#EDEDED',
					375: '#E0E2E7',
					400: '#656565', // gray
					425: '#6B6B6B',
					435: '#6D6D6D',
					450: '#B3B3B3',
					500: '#6E6D7A', // slate
					525: '#4D5464',
					550: '#3D3D3D',
					600: '#221F1F', // dark
					700: '#1A1A1A', // almostBlack
					800: '#818181', // mediumGray
					850: '#908E8E',
					900: '#AFAFAF',
					950: '#91929E'
				},
				blue: {
					100: '#D8E4FC', // lightBlue
					200: '#E5E5FE', // lavender
					300: '#0C7BC4', // blue
					325: '#054CA0',
					350: '#03C3FF',
					375: '#001937',
					400: '#485AFF', // brightBlue
					450: '#1849D6',
					475: '#2E8ED3',
					500: '#5452F6', // indigo
					600: '#1E293B', // gunmetal
					700: '#4285F4', // vibrantBlue
					800: '#EDEEFF', // paleBlue
					900: '#337ab7', // Moderate blue
					925: '#2498DBB2'
				},
				green: {
					50: '#11221150', // translucentDarkGreen
					75: '#112211',
					100: '#8DD3BB', // mintGreen
					200: '#06B217', // brightGreen
					300: '#0D8536',
					320: '#0D85361A',
					350:'#32E886'// lightGreen
				},
				yellow: {
					100: '#FDEB9D' // paleYellow
				},
				red: {
					100: '#FF8682', // lightRed
					150: '#D46E6E' ,//light red
				},
				inkblue:{
					100:"#002280"
				},


				'T-color': 'hsl(var(--title-color))',
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					btnforeground: 'hsl(var(--primary-btn-foreground))'
				},
				accept_btn: {
					DEFAULT: 'hsl(var(--accept-btn))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				reject_btn:{
					DEFAULT: 'hsl(12 76% 61%)',
					foreground: 'red'
				},
				inforeq_btn:{
					DEFAULT: 'hsl(var(--info-btn))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				topbar:{
					DEFAULT: 'hsl(var(--topbar-label))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				}
			},
			height: {
				'btn-sm': 'var(--btn-sm)',
				'tab-lg': 'var(--tab-lg)',
				'tab-md': 'var(--tab-md)',
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			boxShadow: {
				confirmContainerShadow: '0px 4px 16px 0px rgba(17, 34, 17, 0.05)',
				detailsContainerShadow: '0px 1.5px 2px 0px rgba(16, 24, 40, 0.1)',
				inputShadowDrop: '0px 2px 6px 0px rgba(19, 18, 66, 0.07)'
			},
			fontFamily: {
				custom: [
					'-apple-system',
					'BlinkMacSystemFont',
					'"Segoe UI"',
					'Roboto',
					'Helvetica',
					'Arial',
					'sans-serif',
					'"Apple Color Emoji"',
					'"Segoe UI Emoji"',
					'"Segoe UI Symbol"',
				],
				segoe: ['"Segoe UI"', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
				inter: ['var(--font-inter)'],
				roboto: ['var(--font-roboto)'],
				jakarta: ['var(--font-jakarta)'],
				dmsan: ['var(--font-dmsan)']
			},
			fontSize: {
				'T-size': '22px',
				btnFontSizeMd: 'var(--btn-font-size-md)',
				xxs: '11px',
				xs: '13px',
				s: '15px',
				md:'17px',
			},
			lineHeight: {
				'11': '2.75rem',
				'12': '3rem'
			},
			backgroundImage: {
				travel: 'url("/images/travel.jpeg")',
				boat: 'url("/images/boat.jpeg")',
				personal: 'url("/images/personal.png")'
			}
		}
	},
	plugins: [tailwindcssAnimate, btnFontAndSize]
} satisfies Config


export default config
