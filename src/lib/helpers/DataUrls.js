// const URL_BASE = `http://localhost:3000/data/`
const URL_BASE = `${process.env.NEXT_PUBLIC_BASE_URL}/data/`

export const URL_HEADER = URL_BASE + "/header.json"
export const URL_CONTACT = URL_BASE + "/contact.json"
export const URL_FOOTER = URL_BASE + "/footer.json"


export const URL_HOME = URL_BASE + "/home.json"
export const URL_ABOUT = URL_BASE + "/about.json"