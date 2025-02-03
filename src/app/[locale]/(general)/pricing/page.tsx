'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const Subscribe: React.FC = () => {
  const t = useTranslations('PricingPage');

  return (
    <div className="h-screen overflow-auto text-gray-800 py-16 px-4 bg-gray-50 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.raw('plans').map(
            (
              plan: {
                name:
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | Promise<React.AwaitedReactNode>
                  | null
                  | undefined;
                price:
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | Promise<React.AwaitedReactNode>
                  | null
                  | undefined;
                description:
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | Promise<React.AwaitedReactNode>
                  | null
                  | undefined;
                features: (
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactPortal
                  | Promise<React.AwaitedReactNode>
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | null
                  | undefined
                )[];
                buttonText:
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | Promise<React.AwaitedReactNode>
                  | null
                  | undefined;
              },
              index: React.Key | null | undefined
            ) => (
              <div
                key={index}
                className="p-4 py-8 rounded-xl shadow-md transform transition duration-500 hover:scale-105 flex flex-col bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
              >
                <h3 className="text-2xl font-semibold mb-8 text-gray-800 dark:text-gray-100 h-[64px] flex items-center justify-center text-center">
                  {plan.name}
                </h3>

                <div className="text-5xl font-bold mb-4 text-green-600 dark:text-green-400 h-[80px] flex items-center justify-center">
                  {plan.price}{' '}
                  {plan.price !== t('customPrice') && (
                    <span className="text-xl font-medium text-gray-500 dark:text-gray-400 ml-1">
                      /{t('perDevice')}
                    </span>
                  )}
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-6 h-[60px] text-center flex items-center justify-center">
                  {plan.description}
                </p>

                <ul className="space-y-4 mb-8 flex-grow text-gray-600 dark:text-gray-400">
                  {plan.features.map(
                    (
                      feature:
                        | string
                        | number
                        | bigint
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | Promise<React.AwaitedReactNode>
                        | null
                        | undefined,
                      idx: React.Key | null | undefined
                    ) => (
                      <li key={idx} className="flex items-center">
                        <svg
                          className="w-6 h-6 text-green-500 dark:text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="ml-3">{feature}</span>
                      </li>
                    )
                  )}
                </ul>

                <button className="w-full py-3 px-6 rounded-lg font-semibold transition duration-300 bg-green-600 dark:bg-green-500 text-white hover:bg-green-700 dark:hover:bg-green-600 mt-auto shadow-lg">
                  {plan.buttonText}
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
