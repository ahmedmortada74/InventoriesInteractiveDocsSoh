← Go back to 
[Inventories Module Documentation](/Inventories)

# General_Dispense_Sub_new_barcode.aspx

## Overview

**File**: `\Inventories\Process\General_Dispense_Sub_new_barcode.aspx`
**Purpose**: Pharmacy dispensing system with barcode printing functionality for patient medications
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Pharmacists, pharmacy staff, medication dispensing personnel

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Patient Selection (Required for Dispensing)**
- **Patient Dropdown**: Must select valid patient for medication dispensing
- **Error Prevention**: System validates patient is selected before loading prescriptions
- **Data Source**: Patient_information table with active patients
- **Default Behavior**: User must select patient manually
- **Error Message**: Validation prevents prescription loading without patient selection
- **Validation**: Only patients with active visits are available

#### 2. **Date Range Selection (Required for Filtering)**
- **From Date**: Must select valid start date for prescription filtering
- **To Date**: Must select valid end date for prescription filtering
- **Error Prevention**: System validates date range is selected before loading prescriptions
- **Data Source**: User input with date validation
- **Default Behavior**: User must select date range manually
- **Error Message**: Validation prevents prescription loading without date selection
- **Validation**: Date range must be valid and within reasonable limits

#### 3. **Dispensing Type Selection (Required for Filtering)**
- **Type Dropdown**: Must select valid dispensing type (Normal or Extra Dose)
- **Error Prevention**: System validates type is selected before loading prescriptions
- **Data Source**: Static dropdown with Normal and Extra Dose options
- **Default Behavior**: User must select type manually
- **Error Message**: Validation prevents prescription loading without type selection
- **Validation**: Only valid dispensing types are available

#### 4. **Store Selection (Required for Items)**
- **Store Dropdown**: Must select valid store for item filtering
- **Error Prevention**: System validates store is selected before loading items
- **Data Source**: Inventories_wharehouse_store table linked with store rules
- **Default Behavior**: User must select store manually
- **Error Message**: Validation prevents item loading without store selection
- **Validation**: Only stores with available items are available

#### 5. **Printer Selection (Required for Barcode Printing)**
- **Printer Dropdown**: Must select valid printer for barcode printing
- **Error Prevention**: System validates printer is selected before printing
- **Data Source**: inventories_setup_pharm_barcode_printer table
- **Default Behavior**: User must select printer manually
- **Error Message**: Validation prevents printing without printer selection
- **Validation**: Only printers configured for selected store are available

#### 6. **Item Selection (Required for Dispensing)**
- **Item Dropdown**: Must select valid item from available medications
- **Error Prevention**: System validates item is selected before dispensing
- **Data Source**: Inventories_Item_Settings table with available medications
- **Default Behavior**: User must select item manually from dropdown
- **Error Message**: Validation prevents dispensing without item selection
- **Validation**: Only items with available quantities are available

#### 7. **Batch Selection (Required for Dispensing)**
- **Batch Popup**: Must select valid batch for item dispensing
- **Error Prevention**: System validates batch is selected before dispensing
- **Data Source**: Batch inventory with available quantities
- **Default Behavior**: User must select batch from popup
- **Error Message**: Validation prevents dispensing without batch selection
- **Validation**: Only batches with available quantities are available

#### 8. **Quantity Input (Required for Dispensing)**
- **Quantity Field**: Must enter valid quantity for dispensing
- **Error Prevention**: System validates quantity is greater than 0 and within limits
- **Data Source**: User input with validation against available quantities
- **Default Behavior**: User must enter quantity manually
- **Error Message**: Validation prevents dispensing with zero, negative, or excessive quantity
- **Validation**: Quantity must be positive and not exceed available amount

#### 9. **Barcode Count Input (Required for Printing)**
- **Barcode Count Field**: Must enter valid number of barcodes to print
- **Error Prevention**: System validates barcode count is greater than 0
- **Data Source**: User input with validation
- **Default Behavior**: User must enter count manually
- **Error Message**: Validation prevents printing with zero or negative count
- **Validation**: Count must be positive number

### Common Error Scenarios and Prevention

#### **Patient and Date Errors**
- **Error**: No patient selected
- **Prevention**: Always select patient before loading prescriptions
- **Error**: No date range selected
- **Prevention**: Always select date range before loading prescriptions
- **Error**: Invalid date range
- **Prevention**: Verify from date is before to date

#### **Dispensing Type and Store Errors**
- **Error**: No dispensing type selected
- **Prevention**: Always select dispensing type before loading prescriptions
- **Error**: No store selected
- **Prevention**: Always select store before loading items
- **Error**: Store has no available items
- **Prevention**: Verify store has items with available quantities

#### **Printer and Item Errors**
- **Error**: No printer selected
- **Prevention**: Always select printer before printing barcodes
- **Error**: No item selected
- **Prevention**: Always select item from dropdown before dispensing
- **Error**: Item has no available quantity
- **Prevention**: Check available quantity before dispensing

#### **Batch and Quantity Errors**
- **Error**: No batch selected
- **Prevention**: Always select batch from popup before dispensing
- **Error**: Zero or negative quantity
- **Prevention**: Always enter positive quantity values
- **Error**: Quantity exceeds available
- **Prevention**: System validates quantity against available amounts
- **Error**: Quantity exceeds prescription
- **Prevention**: System validates quantity against prescription limits

#### **Barcode Printing Errors**
- **Error**: Zero or negative barcode count
- **Prevention**: Always enter positive barcode count
- **Error**: Printer not available
- **Prevention**: Verify printer is configured and accessible
- **Error**: Printing fails
- **Prevention**: Ensure printer is properly configured

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
2. **User must have pharmacy dispensing permissions** via employee group assignments
3. **Patients must have active visits** in the system
4. **Stores must have available medications** for dispensing
5. **Prescriptions must be active** with proper status
6. **Printers must be configured** for barcode printing
7. **Dispensing workflow must be enabled** for pharmacy items

#### **Required System State**
- User authentication must be active
- Pharmacy dispensing permissions must be configured
- Patient data must be current
- Store data must be current
- Prescription data must be current
- Item inventory data must be current
- Printer configuration must be current
- Dispensing workflow must be enabled

### Success Criteria

#### **For Patient and Date Selection**
- ✅ Patient dropdown populated with active patients only
- ✅ Date range validation ensures proper prescription filtering
- ✅ Patient validation prevents prescription loading without selection
- ✅ Date validation ensures proper date range

#### **For Dispensing Type and Store Selection**
- ✅ Dispensing type dropdown populated with Normal and Extra Dose options
- ✅ Store dropdown populated with available stores only
- ✅ Dispensing type validation prevents prescription loading without selection
- ✅ Store validation ensures proper item filtering

#### **For Printer Selection**
- ✅ Printer dropdown populated with configured printers only
- ✅ Printer validation prevents printing without selection
- ✅ Printer configuration ensures proper barcode printing

#### **For Item Selection**
- ✅ Item dropdown displays all available medications for selected store
- ✅ Item details show complete prescription information
- ✅ Available quantity validation ensures proper limits
- ✅ Unit information displays properly for each item

#### **For Batch Selection**
- ✅ Batch popup displays all available batches for item
- ✅ Batch details show complete inventory information
- ✅ Available quantity validation ensures proper limits
- ✅ Expiration date displays for each batch

#### **For Dispensing Management**
- ✅ Dispensing save creates proper dispensing records
- ✅ Item delete removes items from temporary grid
- ✅ Dispensing workflow works with proper validation
- ✅ Barcode printing works with selected printer

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

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with vertical structure for pharmacy dispensing

### Patient and Date Selection Section

```html
<!-- Patient and Date Selection -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="الإدارة" ColSpanMd="3">
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
        <dx:BootstrapLayoutItem Caption="المسئول" ColSpanMd="3">
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
        <dx:BootstrapLayoutItem Caption="النوع" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox runat="server" Enabled="false" ID="type">
                        <Items>
                            <dx:BootstrapListEditItem Text="Normal" Value="1" Selected="true"></dx:BootstrapListEditItem>
                            <dx:BootstrapListEditItem Text="Extra Dose" Value="2"></dx:BootstrapListEditItem>
                        </Items>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <div style="display:flex; justify-content:space-between">
                        <dx:BootstrapDateEdit runat="server" ID="from" AutoPostBack="false" Caption="من" Width="45%"></dx:BootstrapDateEdit>
                        <dx:BootstrapDateEdit runat="server" ID="to" AutoPostBack="false" Caption="إلى" Width="45%"></dx:BootstrapDateEdit>
                    </div>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الملف الطبي" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="Patient" runat="server" TextFormatString="{1} - {0}" AutoPostBack="true" Enabled="true" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="PatientDS" ValueField="FileId" TextField="Patient_Name" OnSelectedIndexChanged="Patient_SelectedIndexChanged">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="FileId" />
                            <dx:BootstrapListBoxField FieldName="Patient_Name" />
                        </Fields>
                    </dx:BootstrapComboBox>
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
            <dx:BootstrapGridView ID="RequesrItems" AutoPostBack="true" ClientInstanceName="tempItems" KeyFieldName="DoseID" DataSourceID="RequstItemsDS" OnSelectionChanged="RequesrItems_SelectionChanged" ShowHeaderWhenEmpty="True" runat="server" Width="100%" SettingsBehavior-AllowSelectSingleRowOnly="false" AutoGenerateColumns="False" Styles-Cell-HorizontalAlign="Center" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsBehavior-ProcessSelectionChangedOnServer="true">
                <SettingsExport EnableClientSideExportAPI="true" ExcelExportMode="WYSIWYG" />
                <Settings ShowFilterRow="true" />
                <Columns>
                    <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="true"></dx:BootstrapGridViewCommandColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="id" Visible="false"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="DoseID" Visible="false"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Order No"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDateColumn FieldName="Execution Date" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd HH:mm"></dx:BootstrapGridViewDateColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Item Code"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="code" Visible="false"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Item Name"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Route"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Dose"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Dose Unit"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="frequency"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Duration No"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Duration Unit" Visible="true"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Administration Instructions"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="IV_Header_Code_FK" Caption="IV Header" Visible="true"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Protocol_Header_Code_FK" Visible="false"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Protocol Type"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Order Type"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Current Total Doses"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Account" Visible="false"></dx:BootstrapGridViewDataColumn>
                </Columns>
                <SettingsBehavior ProcessFocusedRowChangedOnServer="True" AutoExpandAllGroups="false"></SettingsBehavior>
                <SettingsDetail ExportMode="All" />
                <SettingsDataSecurity AllowDelete="False" AllowInsert="False" AllowEdit="False" />
                <Settings ShowFooter="True" />
                <Settings VerticalScrollableHeight="350" />
                <SettingsPager PageSize="50">
                    <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                </SettingsPager>
                <SettingsExport EnableClientSideExportAPI="true" ExcelExportMode="WYSIWYG" />
                <ClientSideEvents SelectionChanged="OnSelectionChanged" />
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
        <dx:BootstrapLayoutItem Caption="الاسم التجارى" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="inv_no" runat="server" AutoPostBack="True" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="ItemDS" ValueField="item_code" TextField="arabic_name" OnSelectedIndexChanged="inv_no_SelectedIndexChanged">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="item_code" />
                            <dx:BootstrapListBoxField FieldName="arabic_name" />
                            <dx:BootstrapListBoxField FieldName="Expiration_date" />
                            <dx:BootstrapListBoxField FieldName="remain" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الدفعة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <div style="display: flex; align-items: center; justify-content: center">
                        <div style="border: 1px solid #d7d7d7">
                            <dx:BootstrapButton runat="server" Width="100%" ID="batch_no" Visible="false" OnClick="batch_no_Click">
                                <CssClasses Icon="simple-icon-plus" />
                                <SettingsBootstrap RenderOption="Link" />
                            </dx:BootstrapButton>
                        </div>
                        <dx:BootstrapTextBox runat="server" Enabled="false" Width="40%" ID="batch"></dx:BootstrapTextBox>
                        <dx:BootstrapTextBox runat="server" Enabled="false" Width="100%" ID="Date"></dx:BootstrapTextBox>
                    </div>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الكميه المتاحه" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="batchId" Enabled="false" Width="100%"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="المسموح" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" Enabled="false" Width="100%" ID="delivery_amount"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الكميه" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="Quentity" Enabled="true" Width="100%" OnTextChanged="Quentity_TextChanged" AutoPostBack="true"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الحاله" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" Enabled="false" ID="status" Width="100%"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="عدد الباكود" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapSpinEdit runat="server" Enabled="true" ID="count_label" Number="1" MinValue="1" MaxValue="2" Width="100%"></dx:BootstrapSpinEdit>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
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

### Batch Selection Popup

```html
<!-- Batch Selection Popup -->
<dx:BootstrapPopupControl ID="batchPoP" runat="server" ClientInstanceName="popupMessage" CloseAnimationType="Auto" CloseOnEscape="True" HeaderText="الدفعه" Modal="True" PopupHorizontalAlign="WindowCenter" PopupVerticalAlign="WindowCenter" Width="400px" Height="400px">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapFormLayout runat="server">
                <Items>
                    <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
                        <ContentCollection>
                            <dx:ContentControl>
                                <dx:BootstrapGridView runat="server" ID="batchGridView" ClientInstanceName="gridre" AutoGenerateColumns="false" KeyFieldName="Expiration_date" Styles-Cell-HorizontalAlign="Center" DataSourceID="batchGridViewDS" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="true" SettingsBehavior-ProcessSelectionChangedOnServer="true" OnSelectionChanged="batchGridView_SelectionChanged">
                                    <SettingsBehavior ProcessFocusedRowChangedOnServer="True"></SettingsBehavior>
                                    <SettingsDataSecurity AllowDelete="true" AllowInsert="False" AllowEdit="False" />
                                    <Columns>
                                        <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="True" Width="30px"></dx:BootstrapGridViewCommandColumn>
                                        <dx:BootstrapGridViewDataColumn FieldName="Expiration_date" Caption="تاريخ انتهاء الصلاحيه"></dx:BootstrapGridViewDataColumn>
                                        <dx:BootstrapGridViewDataColumn FieldName="remain" Caption="الكميه"></dx:BootstrapGridViewDataColumn>
                                    </Columns>
                                    <Settings VerticalScrollableHeight="350" />
                                    <SettingsBehavior ProcessFocusedRowChangedOnServer="True" ProcessSelectionChangedOnServer="true"></SettingsBehavior>
                                    <SettingsPager Mode="ShowPager" PageSize="8"></SettingsPager>
                                </dx:BootstrapGridView>
                            </dx:ContentControl>
                        </ContentCollection>
                    </dx:BootstrapLayoutItem>
                </Items>
            </dx:BootstrapFormLayout>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapPopupControl>
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

**Patient Parameters**:
- `@file` - Patient file ID for filtering prescriptions
- `@from` - Start date for prescription filtering
- `@to` - End date for prescription filtering

**Dispensing Parameters**:
- `@extra` - Dispensing type for filtering prescriptions (1=Normal, 2=Extra Dose)
- `@STORE` - Store ID for filtering items

**User Context Parameters**:
- `@emp` - Employee code for filtering stores and permissions
- `@ResponsableEmp` - Employee code for store access validation
- `@effective` - Effective materials filter for item selection

**Item Parameters**:
- `@code` - Item code for batch selection
- `@store` - Store ID for batch selection

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Patient Selection**: Loads prescriptions based on selected patient
3. **Date Range Selection**: Filters prescriptions based on date range
4. **Dispensing Type Selection**: Filters prescriptions based on type
5. **Store Selection**: Loads items based on selected store
6. **Printer Selection**: Loads printer configuration for selected store
7. **Item Selection**: Loads batch information for selected item
8. **Batch Selection**: Loads available batches with quantities
9. **Dispensing**: Adds items to temporary dispensing grid
10. **Dispensing Save**: Creates complete dispensing records
11. **Barcode Printing**: Prints barcodes for dispensed items

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

### Patient_SelectedIndexChanged Method

```csharp
protected void Patient_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads patient information based on selected patient

**Process**:
1. Validates patient selection
2. Retrieves patient details
3. Updates patient information display
4. Clears prescription selection

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
1. Validates patient selection
2. Validates date range selection
3. Validates dispensing type selection
4. Sets parameters for prescription data source
5. Binds prescription grid
6. Clears item selection

### RequesrItems_SelectionChanged Method

```csharp
protected void RequesrItems_SelectionChanged(object sender, EventArgs e)
```

**Purpose**: Loads item information for selected prescription

**Process**:
1. Validates prescription selection
2. Retrieves prescription details from grid
3. Sets parameters for item data source
4. Binds item dropdown
5. Updates prescription information display

### inv_no_SelectedIndexChanged Method

```csharp
protected void inv_no_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads batch information for selected item

**Process**:
1. Validates item selection
2. Sets parameters for batch data source
3. Binds batch popup grid
4. Updates item information display

### batch_no_Click Method

```csharp
protected void batch_no_Click(object sender, EventArgs e)
```

**Purpose**: Opens batch selection popup

**Process**:
1. Validates item selection
2. Shows batch popup
3. Binds batch grid with available batches

### batchGridView_SelectionChanged Method

```csharp
protected void batchGridView_SelectionChanged(object sender, EventArgs e)
```

**Purpose**: Loads selected batch information

**Process**:
1. Validates batch selection
2. Retrieves batch details from grid
3. Updates batch information display
4. Closes batch popup

### Quentity_TextChanged Method

```csharp
protected void Quentity_TextChanged(object sender, EventArgs e)
```

**Purpose**: Validates entered quantity

**Process**:
1. Validates quantity is positive
2. Validates quantity does not exceed available
3. Validates quantity does not exceed prescription limit
4. Updates quantity display

### add_Click Method

```csharp
protected void add_Click(object sender, EventArgs e)
```

**Purpose**: Adds item to temporary dispensing grid

**Process**:
1. Validates all required fields are filled
2. Validates quantity is greater than 0
3. Validates batch is selected
4. Checks item availability
5. Inserts item into temporary table
6. Refreshes temporary dispensing grid
7. Clears form fields for next addition

### save_btn_Click Method

```csharp
protected void save_btn_Click(object sender, EventArgs e)
```

**Purpose**: Saves complete dispensing request and prints barcodes

**Process**:
1. Validates at least one item is added
2. Generates new dispensing document number
3. Inserts dispensing header record
4. Inserts all temporary items as details
5. Updates stock records with dispensed quantities
6. Updates prescription remaining quantities
7. Prints barcodes for dispensed items
8. Clears temporary tables
9. Refreshes all grids and controls
10. Provides success feedback

## Database Integration

### Core Database Tables

#### **Patient_information**
- **Purpose**: Patient master data
- **Key Fields**: FileId, Patient_Name
- **Usage**: Provides patient list for selection
- **Filtering**: Only patients with active visits

#### **Inventories_wharehouse_store**
- **Purpose**: Warehouse store master data
- **Key Fields**: id, arabic_name, active, Store_type, pharm_dispense_indicator
- **Usage**: Provides store list for item filtering
- **Filtering**: Only stores with available items and pharmacy dispensing

#### **inventories_setup_pharm_barcode_printer**
- **Purpose**: Barcode printer configuration
- **Key Fields**: ID, printer_path, store_id
- **Usage**: Provides printer list for barcode printing
- **Filtering**: Only printers configured for selected store

#### **Inventories_Item_Settings**
- **Purpose**: Item master data with descriptions
- **Key Fields**: item_code, arabic_name, active
- **Usage**: Provides item information for display
- **Filtering**: Only active items with available quantities

#### **Inventories_Stock**
- **Purpose**: Stock records with batch tracking
- **Key Fields**: Itemcode, storeid, Quantity_Exchange, Amount_Done_Exchange, Expiration_date, MoveType
- **Usage**: Tracks stock availability for dispensing
- **Filtering**: Only items with available quantities

#### **Inventories_General_Dispense_temp**
- **Purpose**: Temporary dispensing records before save
- **Key Fields**: ID, store, patch, Quntitiy, item, emp, date, fileID, ActiveCode, Category, Frequency, Duration_no, Duration_unit, Administration_Instructions, Dose_After, dose_unit, Dose, IvCode, IVName, ProtocolID, Count_Lable, PharmDose_FK, Expiration_date, FK_order_no, ProtocolType
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

#### **1. Patient and Date Selection Section**
```html
<!-- Patient and Date Selection -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="الإدارة" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="المسئول" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="النوع" ColSpanMd="3">
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="الملف الطبي" ColSpanMd="3">
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
            <dx:BootstrapGridView ID="RequesrItems" runat="server" OnSelectionChanged="RequesrItems_SelectionChanged">
```

#### **3. Dispensing Section**
```html
<!-- Dispensing Section -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <CssClasses Group="found" />
    <Items>
        <dx:BootstrapLayoutItem Caption="الاسم التجارى" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
        <dx:BootstrapLayoutItem Caption="الدفعة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="الكميه المتاحه" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
        <dx:BootstrapLayoutItem Caption="المسموح" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
        <dx:BootstrapLayoutItem Caption="الكميه" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
        <dx:BootstrapLayoutItem Caption="الحاله" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
        <dx:BootstrapLayoutItem Caption="عدد الباكود" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
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
// Patient Data Source
SqlDataSource PatientDS = new SqlDataSource();
PatientDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
PatientDS.SelectCommand = "select distinct Patient_information.FileId,Patient_information.Patient_Name from Patient_information";

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
RequstItemsDS.SelectCommand = "if @extra = '1' begin select Orders.OrderID as [Order No], format(Order_Pharmacy_Doses.Execution_Date,'yyyy-MM-dd HH:mm') as [Execution Date], code as [Item Code],code,EnglishName as [Item Name],Route, [Setup_Pharm_RelatedWith].Description,OrderEntery.Remain,OrderEntery.Dose_After as [Dose],dose_unit as [Dose Unit],frequency,Duration_No as [Duration No],OrderEntery.Duration_Unit as [Duration Unit],Administration_Instructions as [Administration Instructions],OrderEntery.Start_Date as [Start Date],OrderEntery.End_Date as [End Date],OrderEntery.id,OrderEntery.Protocol_Items_Type as [Protocol Type],OrderEntery.IV_Header_Code_FK,OrderEntery.Protocol_Header_Code_FK,Category as [Order Type],Empuser,case when OrderEntery.Doctor_Hold=1 then 'H' else 'R' end as [Status],OrderEntery.Doctor_Hold,cast(Order_Pharmacy_Doses.Execution_Date as time) [Start Time],Order_Pharmacy_Doses.Current_Total_Doses as [Current Total Doses],Order_Pharmacy_Doses.id as 'DoseID',Order_Pharmacy_Doses.IV_Header_Code_FK, orders.Account from OrderEntery,[Setup_Pharm_RelatedWith],Orders,Order_Pharmacy_Doses where [Setup_Pharm_RelatedWith].id=OrderEntery.Related_With and Orders.OrderID=OrderEntery.FK_OrderID and Order_Pharmacy_Doses.Order_Entry_FK=OrderEntery.ID and Orders.Department='Pharm' and OrderEntery.Statues= N'To be Verified' and Orders.FileId=@file and OrderEntery.Remain>0 and Statues_indicator='o' and DemandDate between @from and @to and Order_Pharmacy_Doses.Dispence_Done=0 and EXTRA_doses is null and Orders.Account in (Select VisitAccount.AccountNo from VisitAccount where FileId=@file and VisitAccount.Active_Close='A') order by Execution_Date,code,Order_No,OrderEntery.IV_Header_Code_FK end else begin select Orders.OrderID as [Order No], format(Order_Pharmacy_Doses.Execution_Date,'yyyy-MM-dd HH:mm') as [Execution Date], code as [Item Code],code,EnglishName as [Item Name],Route, [Setup_Pharm_RelatedWith].Description,OrderEntery.Remain,OrderEntery.Dose_After as [Dose],dose_unit as [Dose Unit],frequency,Duration_No as [Duration No],OrderEntery.Duration_Unit as [Duration Unit],Administration_Instructions as [Administration Instructions],OrderEntery.Start_Date as [Start Date],OrderEntery.End_Date as [End Date],OrderEntery.id,OrderEntery.Protocol_Items_Type as [Protocol Type],OrderEntery.IV_Header_Code_FK,OrderEntery.Protocol_Header_Code_FK,Category as [Order Type],Empuser,case when OrderEntery.Doctor_Hold=1 then 'H' else 'R' end as [Status],OrderEntery.Doctor_Hold,cast(Order_Pharmacy_Doses.Execution_Date as time) [Start Time],Order_Pharmacy_Doses.Current_Total_Doses as [Current Total Doses],Order_Pharmacy_Doses.id as 'DoseID',Order_Pharmacy_Doses.IV_Header_Code_FK, orders.Account from OrderEntery,[Setup_Pharm_RelatedWith],Orders,Order_Pharmacy_Doses where [Setup_Pharm_RelatedWith].id=OrderEntery.Related_With and Orders.OrderID=OrderEntery.FK_OrderID and Order_Pharmacy_Doses.Order_Entry_FK=OrderEntery.ID and Orders.Department='Pharm' and OrderEntery.Statues= N'To be Verified' and Orders.FileId=@file and OrderEntery.Remain>0 and Statues_indicator='o' and DemandDate between @from and @to and Order_Pharmacy_Doses.Dispence_Done=0 and EXTRA_doses is not null and Orders.Account in (Select VisitAccount.AccountNo from VisitAccount where FileId=@file and VisitAccount.Active_Close='A') order by Execution_Date,code,Order_No,OrderEntery.IV_Header_Code_FK end";

// Item Data Source
SqlDataSource ItemDS = new SqlDataSource();
ItemDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
ItemDS.SelectCommand = "[pharm_StoreBalanceWithBatchNo]";

// Batch Data Source
SqlDataSource batchGridViewDS = new SqlDataSource();
batchGridViewDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
batchGridViewDS.SelectCommand = "select Expiration_date,(SUM(Quantity_Exchange - Amount_Done_Exchange) ) remain from Inventories_Stock where Itemcode=@code and storeid=@store and MoveType in (select procedure_id from Inventories_procedures_orderEffect where quantity_effect=1) and Expiration_date not in (select Expiration_date FROM Inventories_General_Dispense_temp where emp=@emp and item=@code and Quntitiy = (select (SUM(Quantity_Exchange) - SUM(Amount_Done_Exchange) ) from Inventories_Stock where Inventories_Stock.Expiration_date = Inventories_General_Dispense_temp.Expiration_date and Itemcode= @code and storeid=@store ) and date=@date) group by Expiration_date having (SUM(Quantity_Exchange - Amount_Done_Exchange) ) > 0 order by Expiration_date";

// Temporary Dispensing Data Source
SqlDataSource checkGridViewTempDS = new SqlDataSource();
checkGridViewTempDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
checkGridViewTempDS.SelectCommand = "SELECT Inventories_General_Dispense_temp.ID, store, patch, Quntitiy, item, IIS.arabic_name, Inventories_wharehouse_store.arabic_name as 'storename', 'Waiting' as status, ActiveCode, Category, Frequency, Duration_no, Duration_unit, Administration_Instructions, Dose_After, dose_unit, Dose, IvCode, IVName, ProtocolID, Count_Lable, PharmDose_FK, Inventories_General_Dispense_temp.Expiration_date, FK_order_no, ProtocolType FROM Inventories_General_Dispense_temp inner join Inventories_Item_Settings IIS on IIS.item_code = Inventories_General_Dispense_temp.item inner join Inventories_wharehouse_store on Inventories_wharehouse_store.id = store where emp =@emp and fileID = @file_id";
```

## Business Logic and Validation

### Patient and Date Validation

```csharp
protected void search_Click(object sender, EventArgs e)
{
    if (Patient.Value == "" || Patient.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار المريض');", true);
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

**Patient Logic**: Validates patient selection before loading prescriptions
**Date Logic**: Validates date range selection before loading prescriptions
**Error Prevention**: Prevents prescription loading without proper patient and date context

### Dispensing Type and Store Validation

```csharp
protected void RequesrItems_SelectionChanged(object sender, EventArgs e)
{
    if (typeHeader.Value == "" || typeHeader.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار المخزن');", true);
        return;
    }
    // ... additional validation
}
```

**Dispensing Type Logic**: Validates dispensing type selection before loading prescriptions
**Store Logic**: Validates store selection before loading items
**Error Prevention**: Prevents item loading without proper dispensing type and store context

### Item Selection Validation

```csharp
protected void batch_no_Click(object sender, EventArgs e)
{
    if (inv_no.Value == "" || inv_no.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار الصنف');", true);
        return;
    }
    // ... additional validation
}
```

**Item Logic**: Validates item selection before batch selection
**Selection Logic**: Ensures item is selected from item dropdown
**Error Prevention**: Prevents batch selection without proper item selection

### Quantity Validation

```csharp
protected void Quentity_TextChanged(object sender, EventArgs e)
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
    else if (Convert.ToDouble(Quentity.Text) > Convert.ToDouble(delivery_amount.Text))
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الكمية المدخلة اكبر من الكمية المسموح بها');", true);
        return;
    }
    // ... additional validation
}
```

**Quantity Logic**: Validates quantity is positive and within limits
**Availability Logic**: Validates quantity does not exceed available amount
**Prescription Logic**: Validates quantity does not exceed prescription limit
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
- **Patient Selection Validation**: Must select patient before loading prescriptions
- **Date Range Validation**: Must select date range before loading prescriptions
- **Dispensing Type Validation**: Must select dispensing type before loading prescriptions
- **Store Selection Validation**: Must select store before loading items
- **Printer Selection Validation**: Must select printer before printing barcodes
- **Item Selection Validation**: Must select item from dropdown before dispensing
- **Batch Selection Validation**: Must select batch from popup before dispensing
- **Quantity Validation**: Must enter positive quantity within limits
- **Barcode Count Validation**: Must enter positive barcode count

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Patient Validation**: Ensures patient has active visit
- **Date Validation**: Ensures date range is valid and within limits
- **Dispensing Type Validation**: Ensures dispensing type is valid
- **Store Validation**: Ensures store has pharmacy dispensing items
- **Printer Validation**: Ensures printer is configured for selected store
- **Item Availability Validation**: Ensures items have available quantities
- **Batch Availability Validation**: Ensures batches have available quantities
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
  - Dispensing workflow controlled by patient and prescription selection
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

#### **Barcode Printing System**
- **Database Tables**:
  - `inventories_setup_pharm_barcode_printer` - Printer configuration
- **Integration Details**:
  - Printer configuration loaded for selected store
  - Barcode printing triggered after dispensing save
  - Multiple barcode copies supported
- **Data Flow**:
  - Printer configuration loaded from printer master data
  - Barcode data passed to printing system
  - Printing triggered after successful dispensing

### Data Exchange

#### **Patient and Prescription Information**
- **Database Tables**:
  - `Patient_information` - Patient master data
  - `OrderEntery` - Prescription order entries
  - `Order_Pharmacy_Doses` - Pharmacy dose records
- **Real-time Data**:
  - Patient information for prescription filtering
  - Prescription information for dispensing
  - Prescription items with quantities
- **Data Relationships**:
  - Patients linked to prescriptions via file ID
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

#### **"الرجاء اختيار المريض" Error**
- **Cause**: Patient not selected before loading prescriptions
- **Solution**: Always select patient before loading prescriptions
- **Prevention**: Patient selection is required for all dispensing operations

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
- **Cause**: Item not selected from dropdown before dispensing
- **Solution**: Always select item from dropdown before dispensing
- **Prevention**: Item selection is required for all dispensing operations

#### **"الرجاء ادخال الكمية" Error**
- **Cause**: Quantity not entered or zero/negative
- **Solution**: Always enter positive quantity
- **Prevention**: Quantity must be greater than 0

#### **"الكمية المدخلة اكبر من الكمية المتاحة" Error**
- **Cause**: Quantity exceeds available amount
- **Solution**: Enter quantity within available limit
- **Prevention**: System validates quantity against available amounts

#### **"الكمية المدخلة اكبر من الكمية المسموح بها" Error**
- **Cause**: Quantity exceeds prescription limit
- **Solution**: Enter quantity within prescription limit
- **Prevention**: System validates quantity against prescription limits

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
- **Printer Access**: Access to configured barcode printers

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Dispensing Workflow**: Understanding of dispensing process
- **Store Management**: Knowledge of store selection and item filtering
- **Prescription Management**: Familiarity with prescription selection and item loading
- **Dispensing Management**: Understanding of dispensing save, edit, and delete operations
- **Barcode Printing**: Knowledge of barcode printer configuration and printing

## Usage Examples

### Basic Dispensing Workflow

1. **Page Load**: Verify department and employee are auto-selected
2. **Patient Selection**: Select patient for medication dispensing
3. **Date Range Selection**: Select date range for prescription filtering
4. **Dispensing Type Selection**: Select dispensing type (Normal or Extra Dose)
5. **Store Selection**: Select store for dispensing
6. **Printer Selection**: Select printer for barcode printing
7. **Search Execution**: Click search button to load prescriptions
8. **Prescription Selection**: Select prescription from prescription items grid
9. **Item Selection**: Select item from available medications dropdown
10. **Batch Selection**: Select batch from popup for item
11. **Quantity Entry**: Enter dispensing quantity within limits
12. **Barcode Count Entry**: Enter number of barcodes to print
13. **Item Addition**: Click add button to add item to temporary dispensing grid
14. **Repeat Items**: Add additional dispensing items as needed
15. **Dispensing Save**: Click save button to create complete dispensing request and print barcodes

### Dispensing Item Management Workflow

1. **Patient Selection**: Select patient for medication dispensing
2. **Date Range Selection**: Select date range for prescription filtering
3. **Dispensing Type Selection**: Select dispensing type (Normal or Extra Dose)
4. **Store Selection**: Select store for dispensing
5. **Printer Selection**: Select printer for barcode printing
6. **Search Execution**: Click search button to load prescriptions
7. **Prescription Selection**: Select prescription from prescription items grid
8. **Item Selection**: Select item from available medications dropdown
9. **Batch Selection**: Select batch from popup for item
10. **Quantity Entry**: Enter dispensing quantity within limits
11. **Barcode Count Entry**: Enter number of barcodes to print
12. **Item Addition**: Add item to temporary dispensing grid
13. **Item Review**: Review items in temporary dispensing grid
14. **Item Deletion**: Remove items from temporary dispensing grid
15. **Dispensing Completion**: Save dispensing with all validated items and print barcodes

### Multi-Prescription Dispensing Management

1. **Patient Selection**: Select patient for medication dispensing
2. **Date Range Selection**: Select date range for prescription filtering
3. **Dispensing Type Selection**: Select dispensing type (Normal or Extra Dose)
4. **Store Selection**: Select store for dispensing
5. **Printer Selection**: Select printer for barcode printing
6. **Search Execution**: Click search button to load prescriptions
7. **Prescription Review**: Review all prescriptions in prescription items grid
8. **Selective Dispensing**: Add specific items from different prescriptions as needed
9. **Quantity Management**: Manage dispensing quantities for each item
10. **Store Management**: Manage stores for each item
11. **Batch Management**: Manage batches for each item
12. **Dispensing Validation**: Ensure all items have proper validation
13. **Dispensing Save**: Save dispensing with all validated items and print barcodes
