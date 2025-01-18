// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Button } from "@/components/ui/button";
// import { 
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuList,
// } from "@/components/ui/navigation-menu";
// import { Home, Plus, Building, Wallet } from 'lucide-react';

// interface NavbarProps {
//   account?: string;
//   connectWallet: () => void;
//   isLoading: boolean;
// }

// const Navbar: React.FC<NavbarProps> = ({ 
//   account, 
//   connectWallet, 
//   isLoading 
// }) => {
//   return (
//     <div className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container mx-auto px-4">
//         <div className="flex h-16 items-center justify-between">
//           <Link 
//             to="/" 
//             className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
//           >
//             Property Marketplace
//           </Link>

//           <NavigationMenu>
//             <NavigationMenuList className="hidden md:flex space-x-2">
//               <NavigationMenuItem>
//                 <Link to="/">
//                   <Button variant="ghost" className="flex items-center gap-2">
//                     <Home className="h-4 w-4" />
//                     Home
//                   </Button>
//                 </Link>
//               </NavigationMenuItem>
//               <NavigationMenuItem>
//                 <Link to="/add-property">
//                   <Button variant="ghost" className="flex items-center gap-2">
//                     <Plus className="h-4 w-4" />
//                     Add Property
//                   </Button>
//                 </Link>
//               </NavigationMenuItem>
//               <NavigationMenuItem>
//                 <Link to="/your-property">
//                   <Button variant="ghost" className="flex items-center gap-2">
//                     <Building className="h-4 w-4" />
//                     Your Property
//                   </Button>
//                 </Link>
//               </NavigationMenuItem>
//             </NavigationMenuList>
//           </NavigationMenu>

//           <Button 
//             onClick={connectWallet}
//             disabled={isLoading}
//             className="flex items-center gap-2"
//             variant={account ? "outline" : "default"}
//           >
//             <Wallet className="h-4 w-4" />
//             {isLoading ? (
//               <span className="flex items-center gap-2">
//                 <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
//                 Loading...
//               </span>
//             ) : account ? (
//               `${account.slice(0, 6)}...${account.slice(-4)}`
//             ) : (
//               'Connect Wallet'
//             )}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;