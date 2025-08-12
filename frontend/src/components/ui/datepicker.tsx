import {
  DatePicker as Primitive,
  type DatePickerRootProps,
} from "@ark-ui/react/date-picker";
import { Portal } from "@ark-ui/react/portal";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface DatePickerProps extends DatePickerRootProps {
  label?: string;
}

export const DatePicker = ({ label, ...props }: DatePickerProps) => {
  return (
    <Primitive.Root {...props}>
      {label && (
        <Primitive.Label className="text-sm font-medium text-gray-800 mb-1 block">
          {label}
        </Primitive.Label>
      )}
      <Primitive.Control>
        <Primitive.Context>
          {(datePicker) => (
            <Primitive.Trigger
              data-placeholder={datePicker.valueAsString.length === 0}
              className="relative text-sm font-medium rounded-lg h-10 outline-0 items-center inline-flex data-[placeholder=true]:text-gray-400 text-gray-900 ps-3 pe-10 py-1 border border-slate-200 w-full bg-white transition-shadow focus:ring-2 focus:ring-teal-200"
            >
              {datePicker.valueAsString.length !== 0
                ? datePicker.valueAsString.map((date) => date)
                : "Select Date"}
              <Calendar className="size-4 absolute right-3 text-gray-400" />
            </Primitive.Trigger>
          )}
        </Primitive.Context>
      </Primitive.Control>
      <Portal>
        <Primitive.Positioner>
          <Primitive.Content className="bg-white rounded-xl border border-teal-100 p-2 shadow-lg min-w-[260px]">
            <div className="flex gap-2 mb-2">
              <Primitive.YearSelect className="rounded-md border border-slate-200 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal-200" />
              <Primitive.MonthSelect className="rounded-md border border-slate-200 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal-200" />
            </div>
            <Primitive.View view="day">
              <Primitive.Context>
                {(datePicker) => (
                  <>
                    <Primitive.ViewControl className="flex items-center justify-between mb-2">
                      <Primitive.PrevTrigger className="rounded-md px-2 py-1 text-gray-500 hover:bg-teal-50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-200">
                        <ChevronLeft className="size-4" />
                      </Primitive.PrevTrigger>
                      <Primitive.ViewTrigger className="text-sm font-semibold text-gray-700 px-2 py-1 rounded-md hover:bg-teal-50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-200">
                        <Primitive.RangeText />
                      </Primitive.ViewTrigger>
                      <Primitive.NextTrigger className="rounded-md px-2 py-1 text-gray-500 hover:bg-teal-50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-200">
                        <ChevronRight className="size-4" />
                      </Primitive.NextTrigger>
                    </Primitive.ViewControl>
                    <Primitive.Table className="w-full">
                      <Primitive.TableHead>
                        <Primitive.TableRow>
                          {datePicker.weekDays.map((weekDay, id) => (
                            <Primitive.TableHeader
                              key={id}
                              className="text-xs font-medium text-gray-400 py-1"
                            >
                              {weekDay.short}
                            </Primitive.TableHeader>
                          ))}
                        </Primitive.TableRow>
                      </Primitive.TableHead>
                      <Primitive.TableBody>
                        {datePicker.weeks.map((week, id) => (
                          <Primitive.TableRow key={id}>
                            {week.map((day, id) => (
                              <Primitive.TableCell
                                key={id}
                                value={day}
                                className={`p-0`}
                              >
                                <Primitive.TableCellTrigger
                                  className="
                                    size-8 rounded-md cursor-default flex items-center justify-center 
                                    text-sm
                                    hover:bg-teal-100 hover:text-teal-900 transition-colors
                                    focus:outline-none focus:ring-2 focus:ring-teal-200
                                  "
                                >
                                  {day.day}
                                </Primitive.TableCellTrigger>
                              </Primitive.TableCell>
                            ))}
                          </Primitive.TableRow>
                        ))}
                      </Primitive.TableBody>
                    </Primitive.Table>
                  </>
                )}
              </Primitive.Context>
            </Primitive.View>
            <Primitive.View view="month">
              <Primitive.Context>
                {(datePicker) => (
                  <>
                    <Primitive.ViewControl className="flex items-center justify-between mb-2">
                      <Primitive.PrevTrigger className="rounded-md px-2 py-1 text-gray-500 hover:bg-teal-50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-200">
                        <ChevronLeft className="size-4" />
                      </Primitive.PrevTrigger>
                      <Primitive.ViewTrigger className="text-sm font-semibold text-gray-700 px-2 py-1 rounded-md hover:bg-teal-50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-200">
                        <Primitive.RangeText />
                      </Primitive.ViewTrigger>
                      <Primitive.NextTrigger className="rounded-md px-2 py-1 text-gray-500 hover:bg-teal-50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-200">
                        <ChevronRight className="size-4" />
                      </Primitive.NextTrigger>
                    </Primitive.ViewControl>
                    <Primitive.Table className="w-full">
                      <Primitive.TableBody>
                        {datePicker
                          .getMonthsGrid({ columns: 4, format: "short" })
                          .map((months, id) => (
                            <Primitive.TableRow key={id}>
                              {months.map((month, id) => (
                                <Primitive.TableCell
                                  key={id}
                                  value={month.value}
                                  className="p-0"
                                >
                                  <Primitive.TableCellTrigger
                                    className="
                                    size-8 rounded-md cursor-default flex items-center justify-center 
                                    text-sm
                                    hover:bg-teal-100 hover:text-teal-900 transition-colors
                                    focus:outline-none focus:ring-2 focus:ring-teal-200
                                  "
                                  >
                                    {month.label}
                                  </Primitive.TableCellTrigger>
                                </Primitive.TableCell>
                              ))}
                            </Primitive.TableRow>
                          ))}
                      </Primitive.TableBody>
                    </Primitive.Table>
                  </>
                )}
              </Primitive.Context>
            </Primitive.View>
            <Primitive.View view="year">
              <Primitive.Context>
                {(datePicker) => (
                  <>
                    <Primitive.ViewControl className="flex items-center justify-between mb-2">
                      <Primitive.PrevTrigger className="rounded-md px-2 py-1 text-gray-500 hover:bg-teal-50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-200">
                        <ChevronLeft className="size-4" />
                      </Primitive.PrevTrigger>
                      <Primitive.ViewTrigger className="text-sm font-semibold text-gray-700 px-2 py-1 rounded-md hover:bg-teal-50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-200">
                        <Primitive.RangeText />
                      </Primitive.ViewTrigger>
                      <Primitive.NextTrigger className="rounded-md px-2 py-1 text-gray-500 hover:bg-teal-50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-200">
                        <ChevronRight className="size-4" />
                      </Primitive.NextTrigger>
                    </Primitive.ViewControl>
                    <Primitive.Table className="w-full">
                      <Primitive.TableBody>
                        {datePicker
                          .getYearsGrid({ columns: 4 })
                          .map((years, id) => (
                            <Primitive.TableRow key={id}>
                              {years.map((year, id) => (
                                <Primitive.TableCell
                                  key={id}
                                  value={year.value}
                                  className="p-0"
                                >
                                  <Primitive.TableCellTrigger
                                    className="
                                    size-8 rounded-md cursor-default flex items-center justify-center 
                                    text-sm
                                    hover:bg-teal-100 hover:text-teal-900 transition-colors
                                    focus:outline-none focus:ring-2 focus:ring-teal-200
                                  "
                                  >
                                    {year.label}
                                  </Primitive.TableCellTrigger>
                                </Primitive.TableCell>
                              ))}
                            </Primitive.TableRow>
                          ))}
                      </Primitive.TableBody>
                    </Primitive.Table>
                  </>
                )}
              </Primitive.Context>
            </Primitive.View>
          </Primitive.Content>
        </Primitive.Positioner>
      </Portal>
    </Primitive.Root>
  );
};
