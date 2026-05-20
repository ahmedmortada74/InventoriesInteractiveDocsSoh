← Go back to 
[Inventories Module Documentation](/Inventories)

# General_Dispense_Sub_new_CartFiller.aspx

## Overview

**File**: `\Inventories\Process\General_Dispense_Sub_new_CartFiller.aspx`
**Purpose**: Cart filler dispensing system for patient medications with batch editing and nurse station workflow
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Cart filler pharmacists, pharmacy staff, medication dispensing personnel

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Nurse Station Selection (Required for Filtering)**
- **Nurse Station Dropdown**: Must select valid nurse station for prescription filtering
- **Error Prevention**: System validates nurse station is selected before loading prescriptions
- **Data Source**: Admission_Nurse_Station table with ICU and RCG types
- **Default Behavior**: User must select nurse station manually
- **Error Message**: Validation prevents prescription loading without nurse station selection
- **Validation**: Only ICU and RCG nurse stations are available

#### 2. **Date Range Selection (Required for Filtering)**
- **From Date**: Must select valid start date for prescription filtering
- **To Date**: Must select valid end date for prescription filtering
- **Error Prevention**: System validates date range is selected before loading prescriptions
- **Data Source**: User input with date validation
- **Default Behavior**: User must select date range manually
- **Error Message**: Validation prevents prescription loading without date selection
- **Validation**: Date range must be valid and within reasonable limits

#### 3. **Store Selection (Required for Items)**
- **Store Dropdown**: Must select valid store for item filtering
- **Error Prevention**: System validates store is selected before loading items
- **Data Source**: Inventories_wharehouse_store table linked with store rules
- **Default Behavior**: User must select store manually
- **Error Message**: Validation prevents item loading without store selection
- **Validation**: Only stores with available items are available

#### 4. **Printer Selection (Required for Printing)**
- **Printer Dropdown**: Must select valid printer for printing
- **Error Prevention**: System validates printer is selected before printing
- **Data Source**: inventories_setup_pharm_barcode_printer table
- **Default Behavior**: User must select printer manually
- **Error Message**: Validation prevents printing without printer selection
- **Validation**: Only printers configured for selected store are available

#### 5. **Item Selection (Required for Dispensing)**
- **Item Grid Selection**: Must select valid item from prescription items
- **Error Prevention**: System validates item is selected before dispensing
- **Data Source**: Prescription items with available quantities
- **Default Behavior**: User must select item manually from grid
- **Error Message**: Validation prevents dispensing without item selection
- **Validation**: Only items with available quantities are available

#### 6. **Quantity Input (Required for Dispensing)**
- **Quantity Field**: Must enter valid quantity for dispensing
- **Error Prevention**: System validates quantity is greater than 0 and within limits
- **Data Source**: User input with validation against available quantities
- **Default Behavior**: User must enter quantity manually
- **Error Message**: Validation prevents dispensing with zero, negative, or excessive quantity
- **Validation**: Quantity must be positive and not exceed available amount

### Common Error Scenarios and Prevention

#### **Nurse Station and Date Errors**
- **Error**: No nurse station selected
- **Prevention**: Always select nurse station before loading prescriptions
- **Error**: No date range selected
- **Prevention**: Always select date range before loading prescriptions
- **Error**: Invalid date range
- **Prevention**: Verify from date is before to date

#### **Store and Printer Errors**
- **Error**: No store selected
- **Prevention**: Always select store before loading items
- **Error**: No printer selected
- **Prevention**: Always select printer before printing
- **Error**: Store has no available items
- **Prevention**: Verify store has items with available quantities

#### **Item Selection Errors**
- **Error**: No item selected
- **Prevention**: Always select item from grid before dispensing
- **Error**: Item has no available quantity
- **Prevention**: Check available quantity before dispensing
- **Error**: Item already fully dispensed
- **Prevention**: Verify item has remaining quantity

#### **Quantity Errors**
- **Error**: Zero or negative quantity
- **Prevention**: Always enter positive quantity values
- **Error**: Quantity exceeds available
- **Prevention**: System validates quantity against available amounts
- **Error**: Quantity exceeds prescription
- **Prevention**: System validates quantity against prescription limits

#### **Dispensing Management Errors**
- **Error**: No items added to dispensing
- **Prevention**: Add at least one item before saving
- **Error**: Dispensing save fails
- **Prevention**: Ensure all required fields are filled
- **Error**: Item delete fails
- **Prevention**: Select valid item from temporary grid before deleting

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have cart filler dispensing permissions** via employee group assignments
3. **Nurse stations must be configured** in the system
4. **Stores must have available medications** for dispensing
5. **Prescriptions must be active** with proper status
6. **Printers must be configured** for printing
7. **Dispensing workflow must be enabled** for cart filler items

#### **Required System State**
- User authentication must be active
- Cart filler dispensing permissions must be configured
- Nurse station data must be current
- Store data must be current
- Prescription data must be current
- Item inventory data must be current
- Printer configuration must be current
- Dispensing workflow must be enabled

### Success Criteria

#### **For Nurse Station and Date Selection**
- ✅ Nurse station dropdown populated with ICU and RCG stations only
- ✅ Date range validation ensures proper prescription filtering
- ✅ Nurse station validation prevents prescription loading without selection
- ✅ Date validation ensures proper date range

#### **For Store and Printer Selection**
- ✅ Store dropdown populated with available stores only
- ✅ Printer dropdown populated with configured printers only
- ✅ Store validation ensures proper item filtering
- ✅ Printer validation ensures proper printing

#### **For Item Selection**
- ✅ Item grid displays all prescriptions for selected nurse station
- ✅ Item details show complete prescription information
- ✅ Available quantity validation ensures proper limits
- ✅ Unit information displays properly for each item

#### **For Dispensing Management**
- ✅ Dispensing save creates proper dispensing records
- ✅ Item delete removes items from temporary grid
- ✅ Dispensing workflow works with proper validation
- ✅ Batch editing works with proper validation

#### **For Data Management**
- ✅ Temporary dispensing grid refreshes after all operations
- ✅ Selection clears after successful operations
- ✅ Success feedback confirms completion
- ✅ Button states update based on selection and data state

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" Width="100%" ID="BootstrapFormLayout" LayoutType="Vertical" SettingsItemCaptions-HorizontalAlign="Right" dir="rtl">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with vertical structure for cart filler dispensing

### Nurse Station and Date Selection Section

```html
<!-- Nurse Station and Date Selection -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="الإدارة" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="Dep" runat="server" TextFormatString="{1} - {0}" AutoPostBack="True" Enabled="false" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="DepDS" ValueField="DepID" TextField="Dep_Name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="DepID" />
                            <dx:BootstrapListBoxField FieldName="Dep_Name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="المسئول" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="ResponsableEmp" runat="server" TextFormatString="{0} - {1}" Enabled="false" AutoPostBack="True" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="Emp" ValueField="Emp_Code" TextField="User_Name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="Emp_Code" />
                            <dx:BootstrapListBoxField FieldName="User_Name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="6">
            <ContentCollection>
                <dx:ContentControl>
                    <div style="display:flex; justify-content:space-between">
                        <dx:BootstrapDateEdit runat="server" ID="from" AutoPostBack="false" dir="ltr" EditFormat="DateTime" EditFormatString="MM dd, yyyy HH:mm" Caption="من" Width="45%">
                            <TimeSectionProperties Visible="true" TimeEditProperties-AllowMouseWheel="false" />
                        </dx:BootstrapDateEdit>
                        <dx:BootstrapDateEdit runat="server" ID="to" AutoPostBack="false" dir="ltr" EditFormat="DateTime" EditFormatString="MM dd, yyyy HH:mm" Caption="إلى" Width="45%">
                            <TimeSectionProperties Visible="true" TimeEditProperties-AllowMouseWheel="false" />
                        </dx:BootstrapDateEdit>
                    </div>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="Select a Nurse Station" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl ID="DetailsView1">
                    <dx:BootstrapComboBox runat="server" ID="Nurse_Station" AutoPostBack="True" DataSourceID="Nurse_Station_sql" TextField="Description_Latin" ValueField="Code"></dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="المخزن" ColSpanMd="4">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox runat="server" ID="typeHeader" DataSourceID="typeHeaderDS" AutoPostBack="true" TextField="arabic_name" ValueField="code" OnSelectedIndexChanged="typeHeader_SelectedIndexChanged"></dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الطابعة" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox runat="server" ID="bar_code_printer_IP" DataSourceID="SqlDataSource1" AutoPostBack="false" TextField="printer_path" ValueField="ID"></dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="بحث" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="search" runat="server" ClientInstanceName="btn2" Width="100%" Text=" بحث " OnClick="search_Click">
                        <CssClasses Icon="simple-icon-magnifier" />
                        <SettingsBootstrap RenderOption="Success" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Prescription Items Grid Section

```html
<!-- Prescription Items Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="RequesrItems" AutoPostBack="true" ClientInstanceName="RequesrItems" KeyFieldName="DoseID" DataSourceID="RequstItemsDS" ShowHeaderWhenEmpty="True" runat="server" Width="100%" SettingsBehavior-AllowSelectSingleRowOnly="false" AutoGenerateColumns="True" Styles-Cell-HorizontalAlign="Center" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsBehavior-ProcessSelectionChangedOnServer="true" OnHtmlDataCellPrepared="RequesrItems_HtmlDataCellPrepared" OnRowUpdated="RequesrItems_RowUpdated">
                <SettingsExport EnableClientSideExportAPI="true" ExcelExportMode="WYSIWYG" />
                <Settings ShowFilterRow="true" />
                <SettingsEditing Mode="Batch"></SettingsEditing>
                <SettingsDataSecurity AllowEdit="true" AllowDelete="false" AllowInsert="false" />
                <Columns>
                    <dx:BootstrapGridViewCommandColumn SelectAllCheckboxMode="Page" VisibleIndex="0" ShowSelectCheckbox="true"></dx:BootstrapGridViewCommandColumn>
                    <dx:BootstrapGridViewDataColumn SettingsEditForm-Visible="False" FieldName="id" Visible="false"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn SettingsEditForm-Visible="False" FieldName="DoseID" Visible="false"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn SettingsEditForm-Visible="False" FieldName="Order No"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn SettingsEditForm-Visible="False" FieldName="MR" AdaptivePriority="1"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn SettingsEditForm-Visible="False" FieldName="Patient" AdaptivePriority="1"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn SettingsEditForm-Visible="False" FieldName="Bed_No" AdaptivePriority="1"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn SettingsEditForm-Visible="False" FieldName="ItemCode_cartFiller" Caption="ItemCode" AdaptivePriority="1"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn SettingsEditForm-Visible="False" FieldName="English Item Name" Caption="English Item Name" AdaptivePriority="1"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Quntity_cartFiller" Caption="Quntity" AdaptivePriority="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn SettingsEditForm-Visible="False" FieldName="real_balance" Caption="Store Balance" AdaptivePriority="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewDateColumn SettingsEditForm-Visible="False" FieldName="Execution Date" Width="135px" AdaptivePriority="1" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd HH:mm"></dx:BootstrapGridViewDateColumn>
                    <dx:BootstrapGridViewDataColumn SettingsEditForm-Visible="False" FieldName="Item Code" Visible="false"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn SettingsEditForm-Visible="False" FieldName="code" Visible="false"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn SettingsEditForm-Visible="False" FieldName="Item Name" AdaptivePriority="1"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn SettingsEditForm-Visible="False" FieldName="Route" AdaptivePriority="2"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn SettingsEditForm-Visible="False" FieldName="Dose" AdaptivePriority="2"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn SettingsEditForm-Visible="False" FieldName="Dose Unit" AdaptivePriority="2"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn SettingsEditForm-Visible="False" FieldName="frequency" AdaptivePriority="1"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn SettingsEditForm-Visible="False" FieldName="Duration No" AdaptivePriority="1"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn SettingsEditForm-Visible="False" FieldName="Duration Unit" Visible="true" AdaptivePriority="2"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn SettingsEditForm-Visible="False" FieldName="Administration Instructions" AdaptivePriority="2"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn SettingsEditForm-Visible="False" FieldName="IV_Header_Code_FK" Caption="IV Header" Visible="false"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn SettingsEditForm-Visible="False" FieldName="Protocol_Header_Code_FK" Visible="false"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn SettingsEditForm-Visible="False" FieldName="Protocol Type"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn SettingsEditForm-Visible="False" FieldName="Order Type"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn SettingsEditForm-Visible="False" FieldName="Current Total Doses"></dx:BootstrapGridViewDataColumn>
                </Columns>
                <SettingsBehavior AllowSelectSingleRowOnly="false" ProcessFocusedRowChangedOnServer="true" ProcessSelectionChangedOnServer="true" />
                <SettingsPager PageSize="30" NumericButtonCount="6">
                    <Summary Visible="false" />
                    <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                </SettingsPager>
            </dx:BootstrapGridView>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Dispensing Section

```html
<!-- Dispensing Section -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <CssClasses Group="found" />
    <Items>
        <dx:BootstrapLayoutItem Caption=":" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <div style="display: flex; align-content: center; justify-content: center;">
                        <dx:BootstrapButton ID="add" runat="server" ClientInstanceName="btn1" Text=" اضافة " OnClick="add_Click">
                            <ClientSideEvents Click="function(s, e) { DisableButton3(btn1,'btn1'); }" />
                            <CssClasses Icon="simple-icon-plus" />
                            <SettingsBootstrap RenderOption="Secondary" />
                        </dx:BootstrapButton>
                    </div>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Temporary Dispensing Grid Section

```html
<!-- Temporary Dispensing Grid -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapGridView runat="server" ID="checkGridViewTemp" ClientInstanceName="gridre" AutoGenerateColumns="false" KeyFieldName="ID" Styles-Cell-HorizontalAlign="Center" DataSourceID="checkGridViewTempDS" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="true" SettingsBehavior-ProcessFocusedRowChangedOnServer="false" SettingsBehavior-ProcessSelectionChangedOnServer="false" OnSelectionChanged="checkGridViewTemp_SelectionChanged">
                        <Settings ShowFilterRow="true" />
                        <SettingsBehavior ProcessFocusedRowChangedOnServer="True"></SettingsBehavior>
                        <SettingsDataSecurity AllowDelete="true" AllowInsert="False" AllowEdit="False" />
                        <Columns>
                            <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowDeleteButton="true" Width="30px"></dx:BootstrapGridViewCommandColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="ID" Caption="ID" Visible="false"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="store" Caption="كودالمخزن"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="storename" Caption="اسم المخزن"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="FileID" Caption="رقم الملف"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="Patient_Name" Caption="اسم المريض"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="patch" Caption="الدفعه"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="Quntitiy" Caption="الكميه المصروفه"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="item" Caption="كود الصنف"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="arabic_name" Caption="اسم الصنف"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="status" Caption="الحاله"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="ActiveCode" Caption="كود المادة" Visible="false"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Category" Caption="النوع" Visible="false"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Frequency" Caption="التكرار" Visible="false"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Duration_no" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Duration_unit" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Administration_Instructions" Caption="التعليمات" Visible="false"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Dose_After" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="IvCode" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="IVName" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="ProtocolID" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="PharmDose_FK" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Count_Lable" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="dose_unit" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Dose" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Expiration_date" Caption="تاريخ الصلاحية" Visible="true"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="FK_order_no" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="ProtocolType" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="FileID" Caption="الرقم الملف" Visible="false"></dx:BootstrapGridViewTextColumn>
                        </Columns>
                        <Settings VerticalScrollableHeight="350" />
                        <SettingsPager PageSize="50">
                            <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                        </SettingsPager>
                        <Settings ShowFilterRow="True" ShowGroupPanel="true"></Settings>
                        <SettingsBehavior ProcessFocusedRowChangedOnServer="True" ProcessSelectionChangedOnServer="true"></SettingsBehavior>
                        <SettingsPager Mode="ShowPager" PageSize="8"></SettingsPager>
                    </dx:BootstrapGridView>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <div style="display: flex; align-items: center; justify-content: center">
                        <dx:BootstrapButton ID="save_btn" runat="server" ClientInstanceName="btn" Width="20%" Text=" صرف " OnClick="save_btn_Click">
                            <ClientSideEvents Click="function(s, e) { DisableButton3(btn,'btn'); }" />
                            <CssClasses Icon="simple-icon-basket-loaded" />
                            <SettingsBootstrap RenderOption="Danger" />
                        </dx:BootstrapButton>
                    </div>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Print Popup

```html
<!-- Print Popup -->
<dx:BootstrapPopupControl ID="print_pop" runat="server" CloseAction="CloseButton" style="top:0 !important;" ClientInstanceName="popupMessage" CloseAnimationType="Auto" PopupElementCssSelector="#default-popup-control-5" CloseOnEscape="True" HeaderText="print" Modal="True" PopupHorizontalAlign="WindowCenter" PopupVerticalAlign="WindowCenter" Width="1200px">
    <ContentCollection>
        <dx:ContentControl>
            <rsweb:ReportViewer ID="ReportViewer1" KeepSessionAlive="true" runat="server" Height="800px" Width="100%" Visible="true"></rsweb:ReportViewer>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapPopupControl>
```

## Data Flow Architecture

### Query String Parameters

The system uses multiple parameters for comprehensive data filtering:

**Nurse Station Parameters**:
- `@Nurse_Station` - Nurse station code for filtering prescriptions
- `@storID` - Store ID for filtering items

**Date Parameters**:
- `@from` - Start date for prescription filtering
- `@to` - End date for prescription filtering

**User Context Parameters**:
- `@emp` - Employee code for filtering stores and permissions
- `@ResponsableEmp` - Employee code for store access validation

**Item Parameters**:
- `@code` - Item code for batch selection
- `@store` - Store ID for batch selection

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Nurse Station Selection**: Loads prescriptions based on selected nurse station
3. **Date Range Selection**: Filters prescriptions based on date range
4. **Store Selection**: Loads items based on selected store
5. **Printer Selection**: Loads printer configuration for selected store
6. **Item Selection**: Loads batch information for selected item
7. **Dispensing**: Adds items to temporary dispensing grid
8. **Dispensing Save**: Creates complete dispensing records
9. **Printing**: Prints documents for dispensed items

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication cookies
2. Auto-populates department and employee information
3. Disables readonly fields appropriately
4. Sets default dispensing state

### typeHeader_SelectedIndexChanged Method

```csharp
protected void typeHeader_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads items and printer configuration based on selected store

**Process**:
1. Validates store selection
2. Sets parameters for item data source
3. Binds item dropdown
4. Sets parameters for printer data source
5. Binds printer dropdown
6. Clears item selection

### search_Click Method

```csharp
protected void search_Click(object sender, EventArgs e)
```

**Purpose**: Loads prescriptions based on selected filters

**Process**:
1. Validates nurse station selection
2. Validates date range selection
3. Sets parameters for prescription data source
4. Binds prescription grid
5. Clears item selection

### RequesrItems_RowUpdated Method

```csharp
protected void RequesrItems_RowUpdated(object sender, EventArgs e)
```

**Purpose**: Handles batch quantity updates

**Process**:
1. Validates row update
2. Updates batch quantity in database
3. Refreshes prescription grid
4. Provides success feedback

### add_Click Method

```csharp
protected void add_Click(object sender, EventArgs e)
```

**Purpose**: Adds item to temporary dispensing grid

**Process**:
1. Validates all required fields are filled
2. Validates quantity is greater than 0
3. Checks item availability
4. Inserts item into temporary table
5. Refreshes temporary dispensing grid
6. Clears form fields for next addition

### save_btn_Click Method

```csharp
protected void save_btn_Click(object sender, EventArgs e)
```

**Purpose**: Saves complete dispensing request and prints documents

**Process**:
1. Validates at least one item is added
2. Generates new dispensing document number
3. Inserts dispensing header record
4. Inserts all temporary items as details
5. Updates stock records with dispensed quantities
6. Updates prescription remaining quantities
7. Prints documents for dispensed items
8. Clears temporary tables
9. Refreshes all grids and controls
10. Provides success feedback

## Database Integration

### Core Database Tables

#### **Admission_Nurse_Station**
- **Purpose**: Nurse station master data
- **Key Fields**: Code, Description_Latin, Type
- **Usage**: Provides nurse station list for filtering
- **Filtering**: Only ICU and RCG nurse stations

#### **Inventories_wharehouse_store**
- **Purpose**: Warehouse store master data
- **Key Fields**: id, arabic_name, active, Store_type, pharm_dispense_indicator
- **Usage**: Provides store list for item filtering
- **Filtering**: Only stores with available items and pharmacy dispensing

#### **inventories_setup_pharm_barcode_printer**
- **Purpose**: Barcode printer configuration
- **Key Fields**: ID, printer_path, store_id
- **Usage**: Provides printer list for printing
- **Filtering**: Only printers configured for selected store

#### **Inventories_Item_Settings**
- **Purpose**: Item master data with descriptions
- **Key Fields**: item_code, arabic_name, english_name, active
- **Usage**: Provides item information for display
- **Filtering**: Only active items with available quantities

#### **Inventories_Stock**
- **Purpose**: Stock records with batch tracking
- **Key Fields**: Itemcode, storeid, Quantity_Exchange, Amount_Done_Exchange, Expiration_date, MoveType
- **Usage**: Tracks stock availability for dispensing
- **Filtering**: Only items with available quantities

#### **Inventories_General_Dispense_temp**
- **Purpose**: Temporary dispensing records before save
- **Key Fields**: ID, store, patch, Quntitiy, item, emp, date, fileID, ActiveCode, Category, Frequency, Duration_no, Duration_unit, Administration_Instructions, Dose_After, dose_unit, Dose, IvCode, IVName, ProtocolID, Count_Lable, PharmDose_FK, Expiration_date, FK_order_no, ProtocolType, FileID, Patient_Name, Cart_filler_ind
- **Usage**: Tracks dispensing items before request save

#### **Inventories_UOM**
- **Purpose**: Unit of measure master data
- **Key Fields**: id, description, mnemonic
- **Usage**: Provides unit information for items

#### **Inventories_Item_Settings_drug_sheet**
- **Purpose**: Drug sheet information for items
- **Key Fields**: Item_Settings_fk, concentration, concentration_unit, cb_effective_materails
- **Usage**: Provides drug concentration information

#### **Users**
- **Purpose**: User master data with employee codes
- **Key Fields**: Emp_Code, User_Name, Active
- **Usage**: Provides user list for employee selection
- **Filtering**: Excludes system users ('0', '00')

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
ResponsableEmp.Value = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing dispensing operations

#### **Department Assignment**
```csharp
Dep.Value = cn.ExcuteSQL2("SELECT DepID,Dep_Name FROM DefinitionDep WHERE DepID in (SELECT top 1 EmpDepartment FROM DefinitionEmployee1 WHERE(EmpID = N'" + userinfo["code"].ToString() + "'))");
```

**Department Logic**: Auto-populates department based on user's employee record
**Validation**: Ensures user has valid department assignment
**Usage**: Provides context for dispensing operations

#### **Store Filtering**
```sql
SELECT Inventories_rules_stores.id, WS.id as code, arabic_name, Store_type 
FROM Inventories_wharehouse_store WS 
inner join Inventories_rules_stores on store_id = WS.id 
WHERE Inventories_rules_stores.active = 1 and (WS.active = 1) and emp_id = @ResponsableEmp 
and WS.pharm_dispense_indicator = 1
```

**Filtering Logic**: Shows only stores with pharmacy dispensing items for user
**Permission Logic**: Only stores with active rules and pharmacy dispensing are available
**Validation**: Ensures store has dispensing items

## Client-Side JavaScript

### Button Disable Function

```javascript
function DisableButton3(buttonnameobject, buttonnamestring) {
    window.setTimeout(buttonnamestring + ".SetEnabled(false)", 0);
    var x = buttonnameobject;
    x.SetText("جارى التحميل...");
}
```

**Button Logic**: Disables button and changes text during processing
**User Experience**: Prevents duplicate clicks and provides processing feedback
**Usage**: Applied to all operation buttons to prevent multiple submissions

### Selection Changed Event

```javascript
function OnSelectionChanged(s, e) {
    if (e.isSelected) {
        var key = s.GetRowKey(e.visibleIndex);
        alert('Key = ' + key);
    }
}
```

**Selection Logic**: Handles grid selection changes
**User Experience**: Provides feedback on selection
**Usage**: Applied to prescription items grid for selection handling

### Master-Detail Grid Handling

```javascript
function MasterGrid_DetailRowCollapsing(s, e) {
    var key = masterGrid.GetRowKey(e.visibleIndex);
    hf.Set('collapsedRowKey', key);
}
function MasterGrid_EndCallback(s, e) {
    if (hf.Contains('collapsedRowKey'))
        hf.Remove('collapsedRowKey');
}
```

**Grid Features**: Master-detail grid functionality with collapsible rows
**State Management**: Client-side state management for collapsed rows
**Server Integration**: Coordinates with server-side event handling

## Page Structure and Components

### Master Page Integration
- **MasterPageFile**: `~/MasterPage/MainMaster.Master`
- **Bootstrap Framework**: DevExpress Web.Bootstrap v18.2
- **Form Layout**: BootstrapFormLayout with RTL (right-to-left) direction
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Nurse Station and Date Selection Section**
```html
<!-- Nurse Station and Date Selection -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="الإدارة" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="المسئول" ColSpanMd="2">
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="6">
        <dx:BootstrapLayoutItem Caption="Select a Nurse Station" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="المخزن" ColSpanMd="4">
        <dx:BootstrapLayoutItem Caption="الطابعة" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="بحث" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **2. Prescription Items Grid Section**
```html
<!-- Prescription Items Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="RequesrItems" runat="server" OnHtmlDataCellPrepared="RequesrItems_HtmlDataCellPrepared" OnRowUpdated="RequesrItems_RowUpdated">
```

#### **3. Dispensing Section**
```html
<!-- Dispensing Section -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <CssClasses Group="found" />
    <Items>
        <dx:BootstrapLayoutItem Caption=":" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **4. Temporary Dispensing Grid Section**
```html
<!-- Temporary Dispensing Grid -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapGridView ID="checkGridViewTemp" runat="server" OnSelectionChanged="checkGridViewTemp_SelectionChanged">
```

#### **5. Save Button Section**
```html
<!-- Save Button -->
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <div style="display: flex; align-items: center; justify-content: center">
                <dx:BootstrapButton ID="save_btn" runat="server" OnClick="save_btn_Click">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Nurse Station Data Source
SqlDataSource Nurse_Station_sql = new SqlDataSource();
Nurse_Station_sql.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
Nurse_Station_sql.SelectCommand = "SELECT Code,Description_Latin from Admission_Nurse_Station where Type in ('ICU','RCG')";

// Store Data Source
SqlDataSource typeHeaderDS = new SqlDataSource();
typeHeaderDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
typeHeaderDS.SelectCommand = "SELECT Inventories_rules_stores.id, WS.id as code,arabic_name, arabic_name, Store_type FROM Inventories_wharehouse_store WS inner join Inventories_rules_stores on store_id = WS.id WHERE Inventories_rules_stores.active = 1 and (WS.active = 1) and emp_id = @ResponsableEmp and WS.pharm_dispense_indicator = 1";

// Printer Data Source
SqlDataSource SqlDataSource1 = new SqlDataSource();
SqlDataSource1.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource1.SelectCommand = "select printer_path,ID from inventories_setup_pharm_barcode_printer where store_id=@store_id";

// Prescription Items Data Source
SqlDataSource RequstItemsDS = new SqlDataSource();
RequstItemsDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
RequstItemsDS.SelectCommand = "select [Admission_Room_Bed].[Room_Number] As [Room_No],[Admission_Room_Bed].[Room_Number] + '['+ [Admission_Room_Bed].[Bed_Number]+ ']' as 'Bed_No' ,Admission_Reservation.MR,Patient_Name as 'Patient',Admission_Type.Description as 'Admission_Type',Orders.OrderID as [Order No], format(Order_Pharmacy_Doses.Execution_Date,'yyyy-MM-dd HH:mm') as [Execution Date], code as [Item Code],Inventories_Item_Settings.english_name as [English Item Name],code,EnglishName as [Item Name],Route, [Setup_Pharm_RelatedWith].Description,OrderEntery.Remain,OrderEntery.Dose_After as [Dose],dose_unit as [Dose Unit],frequency,Duration_No as [Duration No],OrderEntery.Duration_Unit as [Duration Unit],Administration_Instructions as [Administration Instructions],OrderEntery.Start_Date as [Start Date],OrderEntery.End_Date as [End Date],OrderEntery.id,OrderEntery.Protocol_Items_Type as [Protocol Type],OrderEntery.IV_Header_Code_FK,OrderEntery.Protocol_Header_Code_FK,Category as [Order Type],Empuser,case when OrderEntery.Doctor_Hold=1 then 'H' else 'R' end as [Status],OrderEntery.Doctor_Hold,cast(Order_Pharmacy_Doses.Execution_Date as time) [Start Time],Order_Pharmacy_Doses.Current_Total_Doses as [Current Total Doses],Order_Pharmacy_Doses.id as 'DoseID',Order_Pharmacy_Doses.IV_Header_Code_FK,ItemCode_cartFiller,Quntity_cartFiller,Inventories_Item_Settings.english_name,(select Top(1) isnull(sum(remain),0 ) from View_balance_with_storage where View_balance_with_storage.item_code=ItemCode_cartFiller and View_balance_with_storage.storeid=Store_id_Cart_filler and remain>0) as real_balance from [Admission_Room_Bed] left join Admission_Reservation on Admission_Reservation.Nurse_Station_Code=Admission_Room_Bed.Nurse_Station_Code and Statues not in ('c','D') and Admission_Reservation.Accommodation_Code=Admission_Room_Bed.Accommodation_Code and Admission_Reservation.Room_Number=Admission_Room_Bed.Room_Number and Admission_Reservation.Bed_Number=Admission_Room_Bed.Bed_Number left join Patient_information on MR=FileID left join [Admission_Type] on [dbo].[Admission_Reservation].Admission_Type=[Admission_Type].ID inner join OrderEntery on OrderEntery.FileId=Admission_Reservation.MR inner join [Setup_Pharm_RelatedWith] on [Setup_Pharm_RelatedWith].id=OrderEntery.Related_With inner join Orders on Orders.OrderID=OrderEntery.FK_OrderID inner join Order_Pharmacy_Doses on Order_Pharmacy_Doses.Order_Entry_FK=OrderEntery.ID inner join Inventories_Item_Settings on Inventories_Item_Settings.item_code=ItemCode_cartFiller where Orders.Department='Pharm' and OrderEntery.Statues= N'To be Verified' and Orders.FileId=Admission_Reservation.MR and OrderEntery.Remain>'0' and Statues_indicator='o' and [Admission_Room_Bed].[Nurse_Station_Code]=@Nurse_Station and Admission_Reservation.MR is not null and Order_Pharmacy_Doses.Execution_Date between @from and @to and Order_Pharmacy_Doses.Dispence_Done=0 and Store_id_Cart_filler=@storID and Orders.Account in (Select VisitAccount.AccountNo from VisitAccount where FileId=Admission_Reservation.MR and VisitAccount.Active_Close='A') order by Admission_Reservation.MR,Execution_Date,code,Order_No,OrderEntery.IV_Header_Code_FK";

// Temporary Dispensing Data Source
SqlDataSource checkGridViewTempDS = new SqlDataSource();
checkGridViewTempDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
checkGridViewTempDS.SelectCommand = "SELECT Inventories_General_Dispense_temp.ID, store, patch, Quntitiy, item, IIS.arabic_name, Inventories_wharehouse_store.arabic_name as 'storename', 'Waiting' as status, ActiveCode, Category, Frequency, Duration_no, Duration_unit, Administration_Instructions, Dose_After, dose_unit, Dose, IvCode, IVName, ProtocolID, Count_Lable, PharmDose_FK, Inventories_General_Dispense_temp.Expiration_date, FK_order_no, ProtocolType, Inventories_General_Dispense_temp.FileID, Patient_Name FROM Inventories_General_Dispense_temp inner join Inventories_Item_Settings IIS on IIS.item_code = Inventories_General_Dispense_temp.item inner join Inventories_wharehouse_store on Inventories_wharehouse_store.id = store inner join Patient_information on Patient_information.FileID=Inventories_General_Dispense_temp.fileID where emp =@emp and Cart_filler_ind='1'";
```

## Business Logic and Validation

### Nurse Station and Date Validation

```csharp
protected void search_Click(object sender, EventArgs e)
{
    if (Nurse_Station.Value == "" || Nurse_Station.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار محطة التمريض');", true);
        return;
    }
    else if (from.Text == "" || from.Text == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال التاريخ من');", true);
        return;
    }
    else if (to.Text == "" || to.Text == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال التاريخ الى');", true);
        return;
    }
    // ... additional validation
}
```

**Nurse Station Logic**: Validates nurse station selection before loading prescriptions
**Date Logic**: Validates date range selection before loading prescriptions
**Error Prevention**: Prevents prescription loading without proper nurse station and date context

### Store and Printer Validation

```csharp
protected void RequesrItems_RowUpdated(object sender, EventArgs e)
{
    if (typeHeader.Value == "" || typeHeader.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار المخزن');", true);
        return;
    }
    // ... additional validation
}
```

**Store Logic**: Validates store selection before loading items
**Printer Logic**: Validates printer selection before printing
**Error Prevention**: Prevents item loading without proper store and printer context

### Item Selection Validation

```csharp
protected void add_Click(object sender, EventArgs e)
{
    if (RequesrItems.Selection.Count == 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار الصنف');", true);
        return;
    }
    // ... additional validation
}
```

**Item Logic**: Validates item selection before dispensing
**Selection Logic**: Ensures item is selected from prescription items grid
**Error Prevention**: Prevents dispensing without proper item selection

### Quantity Validation

```csharp
protected void add_Click(object sender, EventArgs e)
{
    if (Convert.ToDouble(Quentity.Text) <= 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال الكمية');", true);
        return;
    }
    else if (Convert.ToDouble(Quentity.Text) > Convert.ToDouble(batchId.Text))
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الكمية المدخلة اكبر من الكمية المتاحة');", true);
        return;
    }
    // ... additional validation
}
```

**Quantity Logic**: Validates quantity is positive and within limits
**Availability Logic**: Validates quantity does not exceed available amount
**Error Prevention**: Prevents dispensing with invalid quantity

### Dispensing Save Validation

```csharp
protected void save_btn_Click(object sender, EventArgs e)
{
    if (checkGridViewTemp.VisibleRowCount == 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('لا يوجد اصناف مضافة');", true);
        return;
    }
    // ... save logic
}
```

**Dispensing Logic**: Validates at least one item is added before saving
**Empty Logic**: Prevents saving empty dispensing requests
**Error Prevention**: Ensures dispensing has proper content before processing

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Nurse Station Selection Validation**: Must select nurse station before loading prescriptions
- **Date Range Validation**: Must select date range before loading prescriptions
- **Store Selection Validation**: Must select store before loading items
- **Printer Selection Validation**: Must select printer before printing
- **Item Selection Validation**: Must select item from grid before dispensing
- **Quantity Validation**: Must enter positive quantity within limits

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Nurse Station Validation**: Ensures nurse station is ICU or RCG type
- **Date Validation**: Ensures date range is valid and within limits
- **Store Validation**: Ensures store has pharmacy dispensing items
- **Printer Validation**: Ensures printer is configured for selected store
- **Item Availability Validation**: Ensures items have available quantities
- **Quantity Validation**: Ensures quantities are within allowed limits

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Store Access**: Ensures user has access to selected store
- **Dispensing Access**: Ensures user can access and modify dispensing requests

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Item Addition Success**: "تم اضافة الصنف" (Item added successfully)
- **Item Delete Success**: "تم حذف الصنف" (Item deleted successfully)
- **Dispensing Save Success**: "تم حفظ طلب الصرف" (Dispensing request saved successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of temporary dispensing grid after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Dispensing Management System**
- **Database Tables**:
  - `Inventories_General_Dispense_temp` - Temporary dispensing records before save
  - `OrderEntery` - Prescription order entries
  - `Order_Pharmacy_Doses` - Pharmacy dose records
- **Integration Details**:
  - Dispensing workflow controlled by nurse station and prescription selection
  - Prescription quantities tracked against remaining amounts
  - Temporary records stored before dispensing save
- **Data Flow**:
  - Items filtered by store and available quantities
  - Dispensing quantities validated against prescription limits
  - Temporary records stored for dispensing save

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
  - **Department Assignment**: Retrieved via SQL query on DefinitionEmployee1 table
- **Database Tables**:
  - `DefinitionDep` table with fields: DepID, Dep_Name
  - `DefinitionEmployee1` table with fields: EmpID, EmpDepartment
  - Connection string: `BackOffice_CS`
- **Permission System**:
  - Department-based access control enforced at database level
  - User authentication required for all dispensing operations
  - Department auto-population based on user profile

#### **Inventory Management System**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_UOM` - Unit of measure master data
  - `Inventories_Stock` - Stock records with batch tracking
- **Integration Details**:
  - Item information displayed for dispensing selection
  - Store availability tracked with batch-level detail
  - Unit information calculated based on item associations
- **Data Flow**:
  - Item details loaded from item master data
  - Store information loaded from store master data
  - Unit information calculated from unit associations

#### **Printing System**
- **Database Tables**:
  - `inventories_setup_pharm_barcode_printer` - Printer configuration
- **Integration Details**:
  - Printer configuration loaded for selected store
  - Printing triggered after dispensing save
  - Multiple document printing supported
- **Data Flow**:
  - Printer configuration loaded from printer master data
  - Document data passed to printing system
  - Printing triggered after successful dispensing

### Data Exchange

#### **Nurse Station and Prescription Information**
- **Database Tables**:
  - `Admission_Nurse_Station` - Nurse station master data
  - `Admission_Reservation` - Patient reservation information
  - `OrderEntery` - Prescription order entries
  - `Order_Pharmacy_Doses` - Pharmacy dose records
- **Real-time Data**:
  - Nurse station information for prescription filtering
  - Prescription information for dispensing
  - Prescription items with quantities
- **Data Relationships**:
  - Nurse stations linked to prescriptions via reservation
  - Prescriptions linked to items via order entries
  - Temporary records cleared after dispensing save

#### **Item and Batch Information**
- **Database Tables**:
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_UOM` - Unit of measure master data
  - `Inventories_Stock` - Stock records with batch tracking
- **Real-time Data**:
  - Item details and descriptions
  - Unit information and calculations
  - Batch information and quantities
- **Data Relationships**:
  - Items linked to types and units
  - Unit information calculated from unit associations
  - Batch information displayed for dispensing items

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار محطة التمريض" Error**
- **Cause**: Nurse station not selected before loading prescriptions
- **Solution**: Always select nurse station before loading prescriptions
- **Prevention**: Nurse station selection is required for all dispensing operations

#### **"الرجاء ادخال التاريخ من" Error**
- **Cause**: From date not selected before loading prescriptions
- **Solution**: Always select from date before loading prescriptions
- **Prevention**: Date range selection is required for all dispensing operations

#### **"الرجاء ادخال التاريخ الى" Error**
- **Cause**: To date not selected before loading prescriptions
- **Solution**: Always select to date before loading prescriptions
- **Prevention**: Date range selection is required for all dispensing operations

#### **"الرجاء اختيار المخزن" Error**
- **Cause**: Store not selected before loading items
- **Solution**: Always select store before loading items
- **Prevention**: Store selection is required for all dispensing operations

#### **"الرجاء اختيار الصنف" Error**
- **Cause**: Item not selected from grid before dispensing
- **Solution**: Always select item from grid before dispensing
- **Prevention**: Item selection is required for all dispensing operations

#### **"الرجاء ادخال الكمية" Error**
- **Cause**: Quantity not entered or zero/negative
- **Solution**: Always enter positive quantity
- **Prevention**: Quantity must be greater than 0

#### **"الكمية المدخلة اكبر من الكمية المتاحة" Error**
- **Cause**: Quantity exceeds available amount
- **Solution**: Enter quantity within available limit
- **Prevention**: System validates quantity against available amounts

#### **"لا يوجد اصناف مضافة" Error**
- **Cause**: No items added to dispensing before saving
- **Solution**: Add at least one item before saving
- **Prevention**: Dispensing must have items before saving

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Dispensing Access**: Access to dispensing operations
- **Store Access**: Access to stores with pharmacy dispensing items
- **Prescription Access**: Access to prescriptions with approval workflow
- **Printer Access**: Access to configured printers

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Dispensing Workflow**: Understanding of dispensing process
- **Store Management**: Knowledge of store selection and item filtering
- **Prescription Management**: Familiarity with prescription selection and item loading
- **Dispensing Management**: Understanding of dispensing save, edit, and delete operations
- **Batch Editing**: Knowledge of batch quantity editing and validation

## Usage Examples

### Basic Dispensing Workflow

1. **Page Load**: Verify department and employee are auto-selected
2. **Nurse Station Selection**: Select nurse station for prescription filtering
3. **Date Range Selection**: Select date range for prescription filtering
4. **Store Selection**: Select store for dispensing
5. **Printer Selection**: Select printer for printing
6. **Search Execution**: Click search button to load prescriptions
7. **Prescription Selection**: Select prescription from prescription items grid
8. **Item Selection**: Select item from prescription items grid
9. **Quantity Entry**: Enter dispensing quantity within limits
10. **Item Addition**: Click add button to add item to temporary dispensing grid
11. **Repeat Items**: Add additional dispensing items as needed
12. **Dispensing Save**: Click save button to create complete dispensing request and print documents

### Batch Editing Workflow

1. **Nurse Station Selection**: Select nurse station for prescription filtering
2. **Date Range Selection**: Select date range for prescription filtering
3. **Store Selection**: Select store for dispensing
4. **Search Execution**: Click search button to load prescriptions
5. **Prescription Selection**: Select prescription from prescription items grid
6. **Batch Editing**: Edit batch quantities directly in prescription items grid
7. **Item Selection**: Select item from prescription items grid
8. **Quantity Entry**: Enter dispensing quantity within limits
9. **Item Addition**: Add item to temporary dispensing grid
10. **Dispensing Save**: Save dispensing with all validated items and print documents

### Multi-Prescription Dispensing Management

1. **Nurse Station Selection**: Select nurse station for prescription filtering
2. **Date Range Selection**: Select date range for prescription filtering
3. **Store Selection**: Select store for dispensing
4. **Search Execution**: Click search button to load prescriptions
5. **Prescription Review**: Review all prescriptions in prescription items grid
6. **Selective Dispensing**: Add specific items from different prescriptions as needed
7. **Quantity Management**: Manage dispensing quantities for each item
8. **Store Management**: Manage stores for each item
9. **Dispensing Validation**: Ensure all items have proper validation
10. **Dispensing Save**: Save dispensing with all validated items and print documents