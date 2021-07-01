module.exports = {
  purge: ['./components/**/*.tsx', './pages/**/*.tsx'],
  mode: 'jit',
  theme: {
    extend: {
      typography: (theme) => ({
          dark: {
            css: {
              color: theme('colors.gray.100'),
              h1: {
                fontSize: '40px',
                fontWeight: 400,
                lineHeight: '110px',
                color: theme('colors.gray.100'),
                fontFamily: 'w-sans',
                text: 'display'
              },
              h2: {
                color: theme('colors.gray.100'),
                fontSize: '34px',
                fontWeight: 400,
                fontFamily: 'w-sans',
                letterSpacing: '-.015em',
                text: 'display'
              },
              h3: {
                color: theme('colors.gray.100'),
                fontSize: '28px',
                fontWeight: 400,
                letterSpacing: '-.015em',
                fontFamily: 'w-sans',
                text: 'display'
              },
              h4: {
                color: theme('colors.gray.100'),
                fontFamily: 'w-sans',
                fontSize: '24px',
                textTransform: 'uppercase',
                fontWeight: 400,
                letterSpacing: '0.1em',
                text: 'display'
              },
              pre: {
                fontFamily: 'sl-code',
                fontWeight: 'normal'
              },
              code: {
                fontFamily: 'sl-code',
                fontWeight: 'normal'
              },
              p: {
                fontSize: '18px'
              },
              li: {
                fontSize: '18px'
              }
            }
          },
          DEFAULT: {
            css: {
              color: theme('colors.gray.800'),
              h1: {
                fontSize: '40px',
                lineHeight: '110px',
                fontWeight: 400,
                fontFamily: 'w-sans'
              },
              h2: {
                fontSize: '34px',
                letterSpacing: '-.015em',
                fontWeight: 400,
                fontFamily: 'w-sans'
              },
              h3: {
                fontFamily: 'w-sans',
                letterSpacing: '-.015em',
                fontSize: '26px',
                fontWeight: 400
              },
              h4: {
                fontFamily: 'w-sans',
                fontSize: '19px',
                textTransform: 'uppercase',
                fontWeight: 400,
                letterSpacing: '0.1em'
              },
              pre: {
                fontFamily: 'sl-code',
                fontWeight: 'normal'
              },
              code: {
                fontFamily: 'sl-code',
                fontWeight: 'normal'
              },
              p: {
                fontSize: '18px',
                lineHeight: '31.5px'
              },
              li: {
                fontSize: '18px'
              }
            }
          }
        }
      ),
      fontFamily: {
        'display': ['w-sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'],
        'text': ['w-sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'],
        'title': ['w-serif', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'],
        'post-title': ['post-title-serif, -apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'],
        'heading': ['w-serif', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'],
        'code': ['sl-code', 'monaco', 'monospaced'],
        'content': ['w-sans, -apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'],
        'sl-serif': ['w-serif, -apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol']
      },
      lineHeight: {
        'extra-loose': '3',
        '12': '3rem'
      },
      fontSize: {
        '5xl': ['3rem', '3.5rem'],
      },
      colors: {
        'shaunblue': {
          50: '#F2F8FF',
          100: '#E6F2FF',
          200: '#BFDEFF',
          300: '#99CAFF',
          400: '#4DA2FF',
          500: '#007AFF',
          600: '#006EE6',
          700: '#004999',
          800: '#003773',
          900: '#00254D'
        }
        , 'shaunred': {
          50: '#ffcc02',
          100: '#ffb300',
          200: '#fd834d',
          300: '#e35416',
          400: '#ff5544',
          500: '#e02200',
          600: '#d5344d',
          700: '#ff2e55',
          800: '#e94256',
          900: '#ff5236'
        },
        'shaunother': {
          50: '#41af9e',
          100: '#f5684d',
          200: '#00afbf',
          300: '#0b9e93',
          400: '#5dbe92',
          500: '#6129ff',
          600: '#af52de',
          700: '#707aed',
          800: '#863051',
          900: '#5ebe92'
        },
        'shaunnew': {
          50: '#005e7f',
          100: '#61b6cd',
          200: '#343D4A',
          300: '#45495a',
          400: '#fcebd3',
          500: '#4a5ad3',
          600: '#595959',
          700: '#1e1e1e',
          800: '#f2f2f2',
          900: '#1f2937'
        }
      }
    }
  },
  variants: {
    extend: {
      typography: ['dark']
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
