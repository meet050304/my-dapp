import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./components/ui/navigation-menu";
import { Button } from "./components/ui/button";
import { Home, Plus, Building, Wallet } from "lucide-react";

const Navbar = ({ account, connectWallet, isLoading }) => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink 
                className={`text-xl font-semibold ${navigationMenuTriggerStyle()}`}
                href="/"
              >
                Property Marketplace
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList className="space-x-2">
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={navigationMenuTriggerStyle()}
                  href="/"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={navigationMenuTriggerStyle()}
                  href="/add-property"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Property
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={navigationMenuTriggerStyle()}
                  href="/your-property"
                >
                  <Building className="mr-2 h-4 w-4" />
                  Your Property
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Button 
            onClick={connectWallet}
            disabled={isLoading}
            className="ml-4"
            variant="outline"
          >
            <Wallet className="mr-2 h-4 w-4" />
            {isLoading 
              ? 'Loading...' 
              : account 
                ? `${account.slice(0, 6)}...${account.slice(-4)}` 
                : 'Connect Wallet'
            }
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;