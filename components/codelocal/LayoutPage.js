import { titleCamelCase } from "@/lib/utils";

export const LayoutPage = (tbl) => {


    const str =  `import Layout from "@/components/Layout";
  
    
export const metadata = {
  title: '${titleCamelCase(tbl)}',
  description: 'Apps created by Aslam Zaman',
}


export default function ${titleCamelCase(tbl)}Layout({ children }) {
    return <Layout>{children}</Layout>  
}
    `
    return str;
}

